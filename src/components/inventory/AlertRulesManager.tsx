import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { useSmartAlerts } from '@/hooks/useSmartAlerts';
import { AlertRule } from '@/hooks/useSmartAlerts';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AlertRulesManager = () => {
  const { alertRules, createAlertRule, isLoading } = useSmartAlerts();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<AlertRule | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'expiration' as const,
    conditions: {
      threshold: 10,
      days_before: 30,
      comparison: 'less_than' as const,
      field: ''
    },
    severity: 'medium' as const,
    channels: ['email'] as string[],
    escalation: {
      enabled: false,
      timeout_minutes: 30,
      escalate_to: [] as string[]
    },
    active: true
  });

  const handleSaveRule = async () => {
    if (!formData.name.trim()) {
      toast.error('El nombre de la regla es requerido');
      return;
    }

    try {
      await createAlertRule(formData as Omit<AlertRule, 'id' | 'created_at'>);
      setShowCreateDialog(false);
      setEditingRule(null);
      resetForm();
      toast.success('Regla de alerta creada exitosamente');
    } catch (error: any) {
      toast.error(`Error creando regla: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'expiration',
      conditions: {
        threshold: 10,
        days_before: 30,
        comparison: 'less_than',
        field: ''
      },
      severity: 'medium',
      channels: ['email'],
      escalation: {
        enabled: false,
        timeout_minutes: 30,
        escalate_to: []
      },
      active: true
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'expiration': return 'Expiración';
      case 'stock': return 'Stock Bajo';
      case 'temperature': return 'Temperatura';
      case 'sales': return 'Ventas';
      case 'custom': return 'Personalizada';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gestión de Reglas de Alertas
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Regla
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingRule ? 'Editar Regla' : 'Crear Nueva Regla de Alerta'}
                </DialogTitle>
                <DialogDescription>
                  Configura las condiciones para generar alertas automáticas
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Información básica */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre de la Regla *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Stock crítico medicamentos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo de Alerta</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expiration">Expiración</SelectItem>
                        <SelectItem value="stock">Stock Bajo</SelectItem>
                        <SelectItem value="temperature">Temperatura</SelectItem>
                        <SelectItem value="sales">Ventas Anómalas</SelectItem>
                        <SelectItem value="custom">Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Condiciones específicas */}
                <div className="space-y-3">
                  <Label>Condiciones</Label>
                  {formData.type === 'expiration' && (
                    <div>
                      <Label htmlFor="days_before">Días antes de vencimiento</Label>
                      <Input
                        id="days_before"
                        type="number"
                        value={formData.conditions.days_before}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, days_before: Number(e.target.value) }
                        })}
                      />
                    </div>
                  )}
                  
                  {formData.type === 'stock' && (
                    <div>
                      <Label htmlFor="threshold">Umbral mínimo de stock</Label>
                      <Input
                        id="threshold"
                        type="number"
                        value={formData.conditions.threshold}
                        onChange={(e) => setFormData({
                          ...formData,
                          conditions: { ...formData.conditions, threshold: Number(e.target.value) }
                        })}
                      />
                    </div>
                  )}
                </div>

                {/* Severidad */}
                <div>
                  <Label htmlFor="severity">Severidad</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value: any) => setFormData({ ...formData, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="critical">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Canales de notificación */}
                <div>
                  <Label>Canales de Notificación</Label>
                  <div className="flex gap-4 mt-2">
                    {['email', 'sms', 'push', 'whatsapp'].map((channel) => (
                      <label key={channel} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.channels.includes(channel)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                channels: [...formData.channels, channel]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                channels: formData.channels.filter(c => c !== channel)
                              });
                            }
                          }}
                        />
                        {channel.charAt(0).toUpperCase() + channel.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Escalamiento */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.escalation.enabled}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        escalation: { ...formData.escalation, enabled: checked }
                      })}
                    />
                    <Label>Habilitar escalamiento automático</Label>
                  </div>
                  
                  {formData.escalation.enabled && (
                    <div>
                      <Label htmlFor="timeout">Tiempo de espera (minutos)</Label>
                      <Input
                        id="timeout"
                        type="number"
                        value={formData.escalation.timeout_minutes}
                        onChange={(e) => setFormData({
                          ...formData,
                          escalation: {
                            ...formData.escalation,
                            timeout_minutes: Number(e.target.value)
                          }
                        })}
                      />
                    </div>
                  )}
                </div>

                {/* Estado activo */}
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label>Regla activa</Label>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateDialog(false);
                      setEditingRule(null);
                      resetForm();
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveRule}>
                    {editingRule ? 'Actualizar' : 'Crear'} Regla
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alertRules && alertRules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
              <p>No hay reglas de alertas configuradas</p>
              <p className="text-sm mt-1">Crea tu primera regla para comenzar a recibir alertas automáticas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alertRules?.map((rule) => (
                <div key={rule.id} className="p-4 border rounded-lg bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{rule.name}</h4>
                      <Badge variant={getSeverityColor(rule.severity)}>
                        {rule.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {getTypeLabel(rule.type)}
                      </Badge>
                      {!rule.active && (
                        <Badge variant="secondary">Inactiva</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    {rule.type === 'expiration' && rule.conditions?.days_before && `Alertar ${rule.conditions.days_before} días antes del vencimiento`}
                    {rule.type === 'stock' && rule.conditions?.threshold && `Alertar cuando el stock sea menor a ${rule.conditions.threshold} unidades`}
                    {rule.type === 'temperature' && 'Alertar sobre anomalías de temperatura'}
                    {rule.type === 'sales' && 'Alertar sobre ventas anómalas'}
                  </div>

                  <div className="flex gap-2 text-xs">
                    <span>Canales:</span>
                    {rule.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>

                  {rule.escalation.enabled && (
                    <div className="text-xs text-muted-foreground mt-1">
                      ⚡ Escalamiento automático después de {rule.escalation.timeout_minutes} minutos
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertRulesManager;