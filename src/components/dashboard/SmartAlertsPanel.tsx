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
      <CardHeader className="bg-gradient-to-r from-gray-100 to-gray-200 border-b-2 border-gray-300">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Bell className="h-5 w-5" />
          Alertas Inteligentes
          {unacknowledgedAlerts.length > 0 && <Badge variant={criticalAlerts.length > 0 ? 'destructive' : 'default'}>
              {unacknowledgedAlerts.length}
            </Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-gradient-to-br from-gray-50 to-white">
        <div className="space-y-3">
          {/* Filtros */}
          <div className="flex gap-2 mb-4">
            <Button variant={activeFilters.severity === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setActiveFilters({
            ...activeFilters,
            severity: 'all'
          })}>
              Todas
            </Button>
            <Button variant={activeFilters.severity === 'critical' ? 'destructive' : 'outline'} size="sm" onClick={() => setActiveFilters({
            ...activeFilters,
            severity: 'critical'
          })}>
              Críticas
            </Button>
            <Button variant={activeFilters.severity === 'high' ? 'destructive' : 'outline'} size="sm" onClick={() => setActiveFilters({
            ...activeFilters,
            severity: 'high'
          })}>
              Altas
            </Button>
          </div>

          {unacknowledgedAlerts.length === 0 ? <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500 bg-gray-200" />
              <p className="text-base text-zinc-800">No hay alertas pendientes</p>
            </div> : unacknowledgedAlerts.slice(0, 5).map(alert => <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg bg-card">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.message}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {new Date(alert.created_at).toLocaleString('es-ES')}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelectedAlert(alert)}>
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reconocer Alerta</DialogTitle>
                        <DialogDescription>
                          ¿Confirmas que has revisado esta alerta?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Notas adicionales (opcional)</label>
                          <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Acciones tomadas, observaciones..." className="mt-1" />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                            Cancelar
                          </Button>
                          <Button onClick={() => handleAcknowledge(alert.id)}>
                            Reconocer
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {alert.severity === 'critical' && <Button size="sm" variant="destructive" onClick={() => handleEscalate(alert.id)}>
                      <AlertTriangle className="h-4 w-4" />
                    </Button>}
                </div>
              </div>)}

          {unacknowledgedAlerts.length > 5 && <div className="text-center pt-2">
              <Button variant="outline" size="sm">
                Ver todas las alertas ({unacknowledgedAlerts.length})
              </Button>
            </div>}
        </div>
      </CardContent>
    </Card>;
};
export default SmartAlertsPanel;