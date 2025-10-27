import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

  // Mock temperature readings query
  const { data: recentReadings, isLoading } = useQuery({
    queryKey: ['temperature-readings'],
    queryFn: async () => {
      return [] as TemperatureReading[];
    },
    refetchInterval: 30000
  });

  // Mock active alerts query
  const { data: activeAlerts } = useQuery({
    queryKey: ['temperature-alerts'],
    queryFn: async () => {
      return [] as TemperatureReading[];
    }
  });

  // Mock IoT reading simulation
  const simulateIoTReading = useMutation({
    mutationFn: async (deviceId: string) => {
      const temperature = 2 + Math.random() * 6;
      const humidity = 40 + Math.random() * 20;
      const alertTriggered = temperature < 2 || temperature > 8;
      
      return {
        id: crypto.randomUUID(),
        device_id: deviceId,
        device_name: `Sensor ${deviceId}`,
        location: 'Refrigerador Principal',
        temperature,
        humidity,
        battery_level: 85 + Math.random() * 15,
        signal_strength: -50 + Math.random() * 30,
        alert_triggered: alertTriggered,
        alert_type: alertTriggered ? 'temperature_out_of_range' : undefined,
        timestamp: new Date().toISOString()
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['temperature-readings'] });
      queryClient.invalidateQueries({ queryKey: ['temperature-alerts'] });
      toast.success('Lectura simulada registrada');
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
