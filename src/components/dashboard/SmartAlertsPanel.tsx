import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useSmartAlerts } from '@/hooks/useSmartAlerts';
import { AlertRule, SmartAlert } from '@/hooks/useSmartAlerts';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
const SmartAlertsPanel = () => {
  const {
    alerts,
    isLoading,
    acknowledgeAlert,
    escalateAlert,
    activeFilters,
    setActiveFilters
  } = useSmartAlerts();
  const [selectedAlert, setSelectedAlert] = useState<SmartAlert | null>(null);
  const [notes, setNotes] = useState('');
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Bell className="h-4 w-4" />;
      case 'low':
        return <Clock className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  const handleAcknowledge = (alertId: string) => {
    acknowledgeAlert({
      alertId,
      notes
    });
    setSelectedAlert(null);
    setNotes('');
    toast.success('Alerta reconocida exitosamente');
  };
  const handleEscalate = (alertId: string) => {
    escalateAlert(alertId);
    toast.warning('Alerta escalada a supervisores');
  };
  if (isLoading) {
    return <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>;
  }
  const unacknowledgedAlerts = alerts?.filter(alert => !alert.acknowledged) || [];
  const criticalAlerts = unacknowledgedAlerts.filter(alert => alert.severity === 'critical');
  return <Card className="border-2 border-gray-400 bg-gradient-to-br from-gray-50 to-white">
      
      
    </Card>;
};
export default SmartAlertsPanel;