
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, AlertTriangle, FileText, User, Calendar, Pill } from 'lucide-react';
import { useControlledMedications } from '@/hooks/useControlledMedications';

const ControlledMedicationsManager = () => {
  const { dispensations, isLoading, dispenseMedication, checkDispenseEligibility } = useControlledMedications();
  const [showDispenseForm, setShowDispenseForm] = useState(false);
  const [eligibilityCheck, setEligibilityCheck] = useState<any>(null);
  const [newDispensation, setNewDispensation] = useState({
    product_id: 0,
    prescription_number: '',
    patient_id: '',
    patient_name: '',
    doctor_name: '',
    doctor_license: '',
    quantity_prescribed: 0,
    quantity_dispensed: 0,
    prescription_date: '',
    dispense_date: new Date().toISOString().split('T')[0],
    next_refill_date: '',
    remaining_refills: 0
  });

  const handleCheckEligibility = async () => {
    if (newDispensation.patient_id && newDispensation.product_id) {
      try {
        const result = await checkDispenseEligibility(newDispensation.patient_id, newDispensation.product_id);
        setEligibilityCheck(result);
      } catch (error) {
        console.error('Error verificando elegibilidad:', error);
      }
    }
  };

  const handleDispenseMedication = (e: React.FormEvent) => {
    e.preventDefault();
    dispenseMedication(newDispensation);
    setNewDispensation({
      product_id: 0,
      prescription_number: '',
      patient_id: '',
      patient_name: '',
      doctor_name: '',
      doctor_license: '',
      quantity_prescribed: 0,
      quantity_dispensed: 0,
      prescription_date: '',
      dispense_date: new Date().toISOString().split('T')[0],
      next_refill_date: '',
      remaining_refills: 0
    });
    setShowDispenseForm(false);
    setEligibilityCheck(null);
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando medicamentos controlados...</div>;
  }

  const pendingArcsaReports = dispensations?.filter(d => !d.arcsa_reported).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <span>Medicamentos Controlados</span>
          </h3>
          <p className="text-sm text-gray-600">Control y seguimiento de sustancias reguladas por ARCSA</p>
        </div>
        <div className="flex space-x-2">
          {pendingArcsaReports > 0 && (
            <Badge variant="destructive" className="mr-2">
              {pendingArcsaReports} sin reportar a ARCSA
            </Badge>
          )}
          <Button 
            onClick={() => setShowDispenseForm(!showDispenseForm)}
            variant="gradient"
          >
            {showDispenseForm ? 'Cancelar' : 'Nueva Dispensación'}
          </Button>
        </div>
      </div>

      {pendingArcsaReports > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Pendiente de Reporte:</strong> Tiene {pendingArcsaReports} dispensaciones que deben 
            reportarse a ARCSA. Es obligatorio reportar dentro de las 48 horas.
          </AlertDescription>
        </Alert>
      )}

      {showDispenseForm && (
        <Card className="p-6">
          <form onSubmit={handleDispenseMedication} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Receta
                </label>
                <Input
                  value={newDispensation.prescription_number}
                  onChange={(e) => setNewDispensation({ ...newDispensation, prescription_number: e.target.value })}
                  placeholder="REC-2024-001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Producto Controlado
                </label>
                <Input
                  type="number"
                  value={newDispensation.product_id}
                  onChange={(e) => setNewDispensation({ 
                    ...newDispensation, 
                    product_id: parseInt(e.target.value) || 0 
                  })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cédula del Paciente
                </label>
                <Input
                  value={newDispensation.patient_id}
                  onChange={(e) => setNewDispensation({ ...newDispensation, patient_id: e.target.value })}
                  placeholder="1234567890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Paciente
                </label>
                <Input
                  value={newDispensation.patient_name}
                  onChange={(e) => setNewDispensation({ ...newDispensation, patient_name: e.target.value })}
                  placeholder="Nombre completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Médico Prescriptor
                </label>
                <Input
                  value={newDispensation.doctor_name}
                  onChange={(e) => setNewDispensation({ ...newDispensation, doctor_name: e.target.value })}
                  placeholder="Dr. Juan Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registro Médico
                </label>
                <Input
                  value={newDispensation.doctor_license}
                  onChange={(e) => setNewDispensation({ ...newDispensation, doctor_license: e.target.value })}
                  placeholder="RM-12345"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad Prescrita
                </label>
                <Input
                  type="number"
                  value={newDispensation.quantity_prescribed}
                  onChange={(e) => setNewDispensation({ 
                    ...newDispensation, 
                    quantity_prescribed: parseInt(e.target.value) || 0 
                  })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad a Dispensar
                </label>
                <Input
                  type="number"
                  value={newDispensation.quantity_dispensed}
                  onChange={(e) => setNewDispensation({ 
                    ...newDispensation, 
                    quantity_dispensed: parseInt(e.target.value) || 0 
                  })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Receta
                </label>
                <Input
                  type="date"
                  value={newDispensation.prescription_date}
                  onChange={(e) => setNewDispensation({ ...newDispensation, prescription_date: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recompras Restantes
                </label>
                <Input
                  type="number"
                  value={newDispensation.remaining_refills}
                  onChange={(e) => setNewDispensation({ 
                    ...newDispensation, 
                    remaining_refills: parseInt(e.target.value) || 0 
                  })}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                type="button" 
                onClick={handleCheckEligibility}
                variant="outline"
                disabled={!newDispensation.patient_id || !newDispensation.product_id}
              >
                Verificar Elegibilidad
              </Button>
              <Button type="submit" variant="gradient">
                Dispensar y Registrar
              </Button>
            </div>

            {eligibilityCheck && (
              <Alert className={`${eligibilityCheck.isEligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <ShieldCheck className={`h-4 w-4 ${eligibilityCheck.isEligible ? 'text-green-600' : 'text-red-600'}`} />
                <AlertDescription className={eligibilityCheck.isEligible ? 'text-green-800' : 'text-red-800'}>
                  <strong>Verificación:</strong> {eligibilityCheck.message}
                  {eligibilityCheck.recentDispensations.length > 0 && (
                    <div className="mt-2">
                      <strong>Dispensaciones recientes:</strong> {eligibilityCheck.recentDispensations.length}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {dispensations?.map((dispensation) => (
          <Card key={dispensation.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Receta: {dispensation.prescription_number}</span>
                {!dispensation.arcsa_reported && (
                  <Badge variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Sin reportar
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(dispensation.dispense_date).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Paciente</span>
                </div>
                <p className="text-gray-900">{dispensation.patient_name}</p>
                <p className="text-gray-600">CI: {dispensation.patient_id}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Médico</span>
                </div>
                <p className="text-gray-900">{dispensation.doctor_name}</p>
                <p className="text-gray-600">Reg: {dispensation.doctor_license}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-700">Dispensación</span>
                </div>
                <p className="text-gray-900">
                  {dispensation.quantity_dispensed} / {dispensation.quantity_prescribed} unidades
                </p>
                <p className="text-gray-600">
                  Recompras: {dispensation.remaining_refills}
                </p>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500 flex justify-between">
              <span>Producto ID: {dispensation.product_id}</span>
              <span>
                {dispensation.arcsa_reported ? 
                  `Reportado: ${dispensation.arcsa_report_date ? new Date(dispensation.arcsa_report_date).toLocaleDateString() : 'Sí'}` : 
                  'Pendiente de reporte ARCSA'}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {dispensations?.length === 0 && (
        <Card className="p-8 text-center">
          <ShieldCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Sin Dispensaciones Registradas</h4>
          <p className="text-gray-600">
            Las dispensaciones de medicamentos controlados aparecerán aquí para cumplir con 
            los requisitos de ARCSA.
          </p>
        </Card>
      )}
    </div>
  );
};

export default ControlledMedicationsManager;
