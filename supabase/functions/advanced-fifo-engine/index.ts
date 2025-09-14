import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, requestedQuantity, settings = {} } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log(`Processing FIFO for product ${productId}, quantity: ${requestedQuantity}`);

    // Obtener todos los lotes disponibles para el producto
    const { data: batches, error } = await supabaseClient
      .from('product_batches')
      .select('*')
      .eq('product_id', productId)
      .gt('quantity', 0)
      .order('expiration_date', { ascending: true })
      .order('manufacturing_date', { ascending: true });

    if (error) throw error;

    const recommendations = [];
    const warnings = [];
    let remainingQuantity = requestedQuantity;
    let totalAvailable = 0;

    // Calcular stock total disponible
    totalAvailable = batches.reduce((sum: number, batch: any) => sum + batch.quantity, 0);

    for (const batch of batches) {
      if (remainingQuantity <= 0) break;

      const daysToExpiry = Math.floor(
        (new Date(batch.expiration_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );

      // Validaciones de seguridad
      if (daysToExpiry < 0) {
        warnings.push(`Lote ${batch.batch_number} está vencido (${Math.abs(daysToExpiry)} días)`);
        continue;
      }

      if (daysToExpiry <= (settings.nearExpiryDays || 30) && !settings.allowNearExpiry) {
        warnings.push(`Lote ${batch.batch_number} vence en ${daysToExpiry} días`);
        if (daysToExpiry <= 7) continue; // No usar lotes que vencen en menos de 7 días
      }

      // Determinar prioridad
      let priority = 'low';
      let reason = 'Stock normal';

      if (daysToExpiry <= 7) {
        priority = 'urgent';
        reason = `Vence en ${daysToExpiry} días - usar prioritariamente`;
      } else if (daysToExpiry <= 30) {
        priority = 'high';
        reason = `Vence en ${daysToExpiry} días - rotación prioritaria`;
      } else if (daysToExpiry <= 90) {
        priority = 'medium';
        reason = `Rotación normal - ${daysToExpiry} días para vencer`;
      }

      // Determinar cantidad a tomar de este lote
      const quantityFromBatch = Math.min(remainingQuantity, batch.quantity);
      
      recommendations.push({
        batchId: batch.id,
        batchNumber: batch.batch_number,
        quantity: quantityFromBatch,
        expirationDate: batch.expiration_date,
        daysToExpiry,
        priority,
        reason,
        location: batch.location,
        temperatureRequired: batch.temperature_requirement_min && batch.temperature_requirement_max,
        isControlledMedication: batch.is_controlled_medication
      });

      remainingQuantity -= quantityFromBatch;

      // Advertencias especiales
      if (batch.is_controlled_medication) {
        warnings.push(`Lote ${batch.batch_number} es medicamento controlado - verificar prescripción`);
      }

      if (batch.temperature_requirement_min || batch.temperature_requirement_max) {
        warnings.push(`Lote ${batch.batch_number} requiere cadena de frío (${batch.temperature_requirement_min}°C - ${batch.temperature_requirement_max}°C)`);
      }
    }

    // Análisis adicional si hay cross-stock optimization
    if (settings.enableCrossStockOptimization && remainingQuantity > 0) {
      // Buscar en otras sucursales (simulado por ahora)
      warnings.push(`Stock insuficiente en sucursal actual. Faltante: ${remainingQuantity} unidades`);
    }

    const result = {
      productId,
      requestedQuantity,
      batches: recommendations,
      warnings,
      totalAvailable,
      canFulfill: remainingQuantity <= 0,
      optimization: {
        totalBatchesUsed: recommendations.length,
        averageDaysToExpiry: recommendations.length > 0 
          ? Math.round(recommendations.reduce((sum, rec) => sum + rec.daysToExpiry, 0) / recommendations.length)
          : 0,
        controlledMedicationIncluded: recommendations.some(rec => rec.isControlledMedication),
        temperatureControlRequired: recommendations.some(rec => rec.temperatureRequired)
      }
    };

    console.log(`FIFO processing completed. Can fulfill: ${result.canFulfill}, batches used: ${recommendations.length}`);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in advanced-fifo-engine:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});