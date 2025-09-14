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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting smart alerts processing...');

    // Obtener reglas activas
    const { data: rules, error: rulesError } = await supabaseClient
      .from('alert_rules')
      .select('*')
      .eq('active', true);

    if (rulesError) throw rulesError;

    let newAlertsCount = 0;
    const processedAlerts = [];

    for (const rule of rules) {
      console.log(`Processing rule: ${rule.name} (${rule.type})`);
      
      let alerts = [];
      
      switch (rule.type) {
        case 'expiration':
          alerts = await processExpirationAlerts(supabaseClient, rule);
          break;
        case 'stock':
          alerts = await processStockAlerts(supabaseClient, rule);
          break;
        case 'temperature':
          alerts = await processTemperatureAlerts(supabaseClient, rule);
          break;
        case 'sales':
          alerts = await processSalesAlerts(supabaseClient, rule);
          break;
      }

      for (const alert of alerts) {
        // Verificar si ya existe alerta similar reciente
        const { data: existing } = await supabaseClient
          .from('smart_alerts')
          .select('id')
          .eq('rule_id', rule.id)
          .eq('data->product_id', alert.data?.product_id)
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
          .limit(1);

        if (!existing?.length) {
          const { error: insertError } = await supabaseClient
            .from('smart_alerts')
            .insert([{
              rule_id: rule.id,
              title: alert.title,
              message: alert.message,
              severity: rule.severity,
              data: alert.data,
              acknowledged: false,
              escalated: false
            }]);

          if (!insertError) {
            newAlertsCount++;
            processedAlerts.push(alert);
            
            // Enviar notificaciones si están configuradas
            if (rule.channels?.length > 0) {
              await sendNotifications(supabaseClient, rule, alert);
            }
          }
        }
      }
    }

    console.log(`Processing completed. Generated ${newAlertsCount} new alerts.`);

    return new Response(JSON.stringify({
      success: true,
      new_alerts: newAlertsCount,
      processed_alerts: processedAlerts
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in process-smart-alerts:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function processExpirationAlerts(supabaseClient: any, rule: any) {
  const daysBefore = rule.conditions.days_before || 30;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysBefore);

  const { data: batches, error } = await supabaseClient
    .from('product_batches')
    .select('*')
    .lte('expiration_date', targetDate.toISOString().split('T')[0])
    .gt('quantity', 0);

  if (error) throw error;

  return batches.map((batch: any) => ({
    title: `Producto próximo a vencer`,
    message: `El lote ${batch.batch_number} vence el ${batch.expiration_date}. Stock: ${batch.quantity}`,
    data: {
      product_id: batch.product_id,
      batch_id: batch.id,
      expiration_date: batch.expiration_date,
      quantity: batch.quantity
    }
  }));
}

async function processStockAlerts(supabaseClient: any, rule: any) {
  const threshold = rule.conditions.threshold || 10;
  
  const { data: lowStock, error } = await supabaseClient
    .from('product_batches')
    .select('*')
    .lte('quantity', threshold)
    .gt('quantity', 0);

  if (error) throw error;

  return lowStock.map((batch: any) => ({
    title: `Stock bajo`,
    message: `El lote ${batch.batch_number} tiene solo ${batch.quantity} unidades disponibles`,
    data: {
      product_id: batch.product_id,
      batch_id: batch.id,
      quantity: batch.quantity,
      threshold
    }
  }));
}

async function processTemperatureAlerts(supabaseClient: any, rule: any) {
  const { data: temperatureAlerts, error } = await supabaseClient
    .from('temperature_readings')
    .select('*')
    .eq('alert_triggered', true)
    .gte('timestamp', new Date(Date.now() - 60 * 60 * 1000).toISOString());

  if (error) throw error;

  return temperatureAlerts.map((reading: any) => ({
    title: `Alerta de temperatura`,
    message: `Temperatura fuera de rango en ${reading.location}: ${reading.temperature}°C`,
    data: {
      device_id: reading.device_id,
      temperature: reading.temperature,
      location: reading.location,
      alert_type: reading.alert_type
    }
  }));
}

async function processSalesAlerts(supabaseClient: any, rule: any) {
  // Análisis de ventas anómalas
  const threshold = rule.conditions.threshold || 100;
  const hours = rule.conditions.hours_period || 24;
  
  const { data: recentSales, error } = await supabaseClient
    .from('inventory_movements')
    .select('*')
    .eq('movement_type', 'sale')
    .gte('created_at', new Date(Date.now() - hours * 60 * 60 * 1000).toISOString());

  if (error) throw error;

  // Agrupar por producto y detectar anomalías
  const productSales = recentSales.reduce((acc: any, sale: any) => {
    if (!acc[sale.product_id]) acc[sale.product_id] = 0;
    acc[sale.product_id] += Math.abs(sale.quantity);
    return acc;
  }, {});

  const anomalies = Object.entries(productSales)
    .filter(([_, quantity]) => (quantity as number) > threshold)
    .map(([productId, quantity]) => ({
      title: `Ventas anómalas detectadas`,
      message: `Producto ${productId} ha vendido ${quantity} unidades en ${hours} horas`,
      data: {
        product_id: parseInt(productId),
        quantity,
        period_hours: hours,
        threshold
      }
    }));

  return anomalies;
}

async function sendNotifications(supabaseClient: any, rule: any, alert: any) {
  // Implementar envío de notificaciones según los canales configurados
  for (const channel of rule.channels) {
    try {
      switch (channel) {
        case 'email':
          // await sendEmailNotification(alert);
          break;
        case 'sms':
          // await sendSMSNotification(alert);
          break;
        case 'whatsapp':
          // await sendWhatsAppNotification(alert);
          break;
        case 'push':
          // await sendPushNotification(alert);
          break;
      }
    } catch (error) {
      console.error(`Error sending ${channel} notification:`, error);
    }
  }
}