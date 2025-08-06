
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface TemperatureReading {
  id: string;
  device_id: string;
  device_name: string;
  location: string;
  temperature: number;
  humidity?: number;
  battery_level?: number;
  signal_strength?: number;
  alert_triggered: boolean;
  alert_type?: string;
  timestamp: string;
}

export const useTemperatureMonitoring = () => {
  const queryClient = useQueryClient();

  // Obtener lecturas de temperatura recientes
  const { data: recentReadings, isLoading } = useQuery({
    queryKey: ['temperature-readings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('temperature_readings')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data as TemperatureReading[];
    },
    refetchInterval: 30000 // Actualizar cada 30 segundos
  });

  // Obtener alertas activas
  const { data: activeAlerts } = useQuery({
    queryKey: ['temperature-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('temperature_readings')
        .select('*')
        .eq('alert_triggered', true)
        .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data as TemperatureReading[];
    }
  });

  // Simular inserción de datos IoT (para pruebas)
  const simulateIoTReading = useMutation({
    mutationFn: async (deviceId: string) => {
      const temperature = 2 + Math.random() * 6; // 2-8°C rango normal refrigerador
      const humidity = 40 + Math.random() * 20; // 40-60% humedad
      const alertTriggered = temperature < 2 || temperature > 8;
      
      const { data, error } = await supabase
        .from('temperature_readings')
        .insert([{
          device_id: deviceId,
          device_name: `Sensor ${deviceId}`,
          location: 'Refrigerador Principal',
          temperature,
          humidity,
          battery_level: 85 + Math.random() * 15,
          signal_strength: -50 + Math.random() * 30,
          alert_triggered: alertTriggered,
          alert_type: alertTriggered ? 'temperature_out_of_range' : null
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temperature-readings'] });
      queryClient.invalidateQueries({ queryKey: ['temperature-alerts'] });
    }
  });

  return {
    recentReadings,
    activeAlerts,
    isLoading,
    simulateIoTReading: simulateIoTReading.mutate,
    isSimulating: simulateIoTReading.isPending
  };
};
