import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Database
} from 'lucide-react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const OfflineSyncStatus = () => {
  const {
    isOnline,
    isSyncing,
    pendingActions,
    conflicts,
    syncPendingActions,
    resolveConflict,
    conflictsCount,
    pendingCount
  } = useOfflineSync();

  const handleManualSync = () => {
    if (!isOnline) {
      toast.error('No hay conexión a internet');
      return;
    }
    syncPendingActions();
  };

  const handleResolveConflict = (conflictId: string, resolution: 'keep_local' | 'keep_server' | 'merge') => {
    resolveConflict(conflictId, resolution);
  };

  const getStatusColor = () => {
    if (!isOnline) return 'destructive';
    if (conflictsCount > 0) return 'destructive';
    if (pendingCount > 0) return 'default';
    return 'default';
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4" />;
    if (isSyncing) return <RefreshCw className="h-4 w-4 animate-spin" />;
    if (conflictsCount > 0) return <AlertCircle className="h-4 w-4" />;
    if (pendingCount > 0) return <Clock className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (!isOnline) return 'Sin conexión';
    if (isSyncing) return 'Sincronizando...';
    if (conflictsCount > 0) return `${conflictsCount} conflictos`;
    if (pendingCount > 0) return `${pendingCount} pendientes`;
    return 'Sincronizado';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Estado de Sincronización
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Estado principal */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium">
              {isOnline ? 'En línea' : 'Sin conexión'}
            </span>
          </div>
          <Badge variant={getStatusColor()} className="flex items-center gap-1">
            {getStatusIcon()}
            {getStatusText()}
          </Badge>
        </div>

        {/* Resumen de estado */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-medium">{pendingCount}</div>
            <div className="text-muted-foreground">Pendientes</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-medium">{conflictsCount}</div>
            <div className="text-muted-foreground">Conflictos</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-medium text-green-600">
              {isOnline ? 'Activo' : 'Offline'}
            </div>
            <div className="text-muted-foreground">Estado</div>
          </div>
        </div>

        {/* Acciones pendientes */}
        {pendingCount > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Acciones Pendientes:</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {pendingActions.slice(0, 5).map((action) => (
                <div key={action.id} className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                  <span>{action.type.toUpperCase()} en {action.table}</span>
                  <Badge variant="outline" className="text-xs">
                    {action.retries} reintentos
                  </Badge>
                </div>
              ))}
              {pendingActions.length > 5 && (
                <div className="text-xs text-muted-foreground text-center">
                  +{pendingActions.length - 5} más...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Conflictos */}
        {conflictsCount > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-red-600">Conflictos Detectados:</h4>
            <div className="space-y-2">
              {conflicts.slice(0, 3).map((conflict) => (
                <div key={conflict.id} className="p-2 border border-red-200 rounded bg-red-50">
                  <div className="text-xs font-medium">
                    Conflicto en {conflict.localData?.table || 'tabla desconocida'}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {new Date(conflict.timestamp).toLocaleString('es-ES')}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-6"
                      onClick={() => handleResolveConflict(conflict.id, 'keep_local')}
                    >
                      Mantener local
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-6"
                      onClick={() => handleResolveConflict(conflict.id, 'keep_server')}
                    >
                      Mantener servidor
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-6"
                      onClick={() => handleResolveConflict(conflict.id, 'merge')}
                    >
                      Combinar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button
            onClick={handleManualSync}
            disabled={!isOnline || isSyncing}
            size="sm"
            className="flex-1"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sincronizando...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sincronizar Ahora
              </>
            )}
          </Button>

          {(pendingCount > 5 || conflictsCount > 3) && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Ver Detalles
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Detalles de Sincronización</DialogTitle>
                  <DialogDescription>
                    Estado completo de las acciones pendientes y conflictos
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {/* Lista completa de acciones pendientes */}
                  {pendingCount > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Acciones Pendientes ({pendingCount})</h4>
                      <div className="space-y-1">
                        {pendingActions.map((action) => (
                          <div key={action.id} className="text-sm p-2 bg-muted rounded">
                            <div className="flex justify-between">
                              <span>{action.type.toUpperCase()} en {action.table}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(action.timestamp).toLocaleString('es-ES')}
                              </span>
                            </div>
                            {action.retries > 0 && (
                              <div className="text-xs text-red-600 mt-1">
                                {action.retries} reintentos fallidos
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lista completa de conflictos */}
                  {conflictsCount > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Conflictos ({conflictsCount})</h4>
                      <div className="space-y-2">
                        {conflicts.map((conflict) => (
                          <div key={conflict.id} className="p-3 border border-red-200 rounded">
                            <div className="font-medium text-sm">
                              {conflict.localData?.table || 'Tabla desconocida'}
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {new Date(conflict.timestamp).toLocaleString('es-ES')}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleResolveConflict(conflict.id, 'keep_local')}
                              >
                                Mantener Local
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleResolveConflict(conflict.id, 'keep_server')}
                              >
                                Mantener Servidor
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleResolveConflict(conflict.id, 'merge')}
                              >
                                Combinar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Información adicional */}
        <div className="text-xs text-muted-foreground">
          {isOnline ? (
            'Los cambios se sincronizan automáticamente'
          ) : (
            'Los cambios se guardarán localmente hasta recuperar la conexión'
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineSyncStatus;