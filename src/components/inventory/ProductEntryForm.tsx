
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Save, X } from 'lucide-react';
import { PharmaceuticalForm, AdministrationRoute, SaleCategory } from '@/types/inventory';

interface ProductEntryFormProps {
  onClose: () => void;
  onSave: (product: any) => void;
}

const ProductEntryForm = ({ onClose, onSave }: ProductEntryFormProps) => {
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    brand: '',
    barcode: '',
    category: '',
    stock: 0,
    minStock: 0,
    maxStock: 0,
    expiry: '',
    branch: '',
    
    // Pharmaceutical Info
    registroSanitario: '',
    codigoATC: '',
    codigoSISMED: '',
    principioActivo: '',
    concentracion: '',
    formaFarmaceutica: 'tabletas' as PharmaceuticalForm,
    viaAdministracion: 'oral' as AdministrationRoute,
    numeroLote: '',
    fechaFabricacion: '',
    laboratorioFabricante: '',
    categoriaVenta: 'libre' as SaleCategory,
    requiereRefrigeracion: false,
    medicamentoControlado: false,
    precioCompra: 0,
    precioVentaPublico: 0,
    margenGanancia: 0,
    proveedorDistribuidor: '',
    rotacionPromedio: 0,
    diasAnticipadoVencimiento: 60
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now(),
      ...formData,
      status: formData.stock < formData.minStock ? 'low' : 'ok',
      lastMovement: new Date().toISOString().split('T')[0],
      pharmaceuticalInfo: {
        registroSanitario: formData.registroSanitario,
        codigoATC: formData.codigoATC,
        codigoSISMED: formData.codigoSISMED,
        principioActivo: formData.principioActivo,
        concentracion: formData.concentracion,
        formaFarmaceutica: formData.formaFarmaceutica,
        viaAdministracion: formData.viaAdministracion,
        numeroLote: formData.numeroLote,
        fechaFabricacion: formData.fechaFabricacion,
        laboratorioFabricante: formData.laboratorioFabricante,
        categoriaVenta: formData.categoriaVenta,
        requiereRefrigeracion: formData.requiereRefrigeracion,
        medicamentoControlado: formData.medicamentoControlado,
        precioCompra: formData.precioCompra,
        precioVentaPublico: formData.precioVentaPublico,
        margenGanancia: formData.margenGanancia,
        proveedorDistribuidor: formData.proveedorDistribuidor,
        rotacionPromedio: formData.rotacionPromedio,
        diasAnticipadoVencimiento: formData.diasAnticipadoVencimiento
      }
    };

    onSave(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Ingresar Nuevo Producto</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Marca *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="barcode">Código de Barras *</Label>
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="branch">Sucursal *</Label>
                <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Centro">Centro</SelectItem>
                    <SelectItem value="Norte">Norte</SelectItem>
                    <SelectItem value="Sur">Sur</SelectItem>
                    <SelectItem value="Este">Este</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información de Stock</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="stock">Stock Actual *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="minStock">Stock Mínimo *</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange('minStock', parseInt(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxStock">Stock Máximo *</Label>
                <Input
                  id="maxStock"
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => handleInputChange('maxStock', parseInt(e.target.value) || 0)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Pharmaceutical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Farmacéutica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registroSanitario">Registro Sanitario *</Label>
                  <Input
                    id="registroSanitario"
                    value={formData.registroSanitario}
                    onChange={(e) => handleInputChange('registroSanitario', e.target.value)}
                    placeholder="INVIMA2023M-001234"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="codigoATC">Código ATC *</Label>
                  <Input
                    id="codigoATC"
                    value={formData.codigoATC}
                    onChange={(e) => handleInputChange('codigoATC', e.target.value)}
                    placeholder="N02BE01"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="codigoSISMED">Código SISMED</Label>
                  <Input
                    id="codigoSISMED"
                    value={formData.codigoSISMED}
                    onChange={(e) => handleInputChange('codigoSISMED', e.target.value)}
                    placeholder="SIS001234"
                  />
                </div>
                <div>
                  <Label htmlFor="principioActivo">Principio Activo *</Label>
                  <Input
                    id="principioActivo"
                    value={formData.principioActivo}
                    onChange={(e) => handleInputChange('principioActivo', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="concentracion">Concentración *</Label>
                  <Input
                    id="concentracion"
                    value={formData.concentracion}
                    onChange={(e) => handleInputChange('concentracion', e.target.value)}
                    placeholder="500mg"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="formaFarmaceutica">Forma Farmacéutica *</Label>
                  <Select value={formData.formaFarmaceutica} onValueChange={(value) => handleInputChange('formaFarmaceutica', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tabletas">Tabletas</SelectItem>
                      <SelectItem value="capsulas">Cápsulas</SelectItem>
                      <SelectItem value="suspension">Suspensión</SelectItem>
                      <SelectItem value="inyectable">Inyectable</SelectItem>
                      <SelectItem value="crema">Crema</SelectItem>
                      <SelectItem value="jarabe">Jarabe</SelectItem>
                      <SelectItem value="gotas">Gotas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="viaAdministracion">Vía de Administración *</Label>
                  <Select value={formData.viaAdministracion} onValueChange={(value) => handleInputChange('viaAdministracion', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="topica">Tópica</SelectItem>
                      <SelectItem value="parenteral">Parenteral</SelectItem>
                      <SelectItem value="oftalmica">Oftálmica</SelectItem>
                      <SelectItem value="nasal">Nasal</SelectItem>
                      <SelectItem value="rectal">Rectal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="categoriaVenta">Categoría de Venta *</Label>
                  <Select value={formData.categoriaVenta} onValueChange={(value) => handleInputChange('categoriaVenta', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="libre">Venta Libre</SelectItem>
                      <SelectItem value="formula_medica">Fórmula Médica</SelectItem>
                      <SelectItem value="control_especial">Control Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiereRefrigeracion"
                    checked={formData.requiereRefrigeracion}
                    onCheckedChange={(checked) => handleInputChange('requiereRefrigeracion', checked)}
                  />
                  <Label htmlFor="requiereRefrigeracion">Requiere Refrigeración</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="medicamentoControlado"
                    checked={formData.medicamentoControlado}
                    onCheckedChange={(checked) => handleInputChange('medicamentoControlado', checked)}
                  />
                  <Label htmlFor="medicamentoControlado">Medicamento Controlado</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lot Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información del Lote</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroLote">Número de Lote *</Label>
                <Input
                  id="numeroLote"
                  value={formData.numeroLote}
                  onChange={(e) => handleInputChange('numeroLote', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fechaFabricacion">Fecha de Fabricación *</Label>
                <Input
                  id="fechaFabricacion"
                  type="date"
                  value={formData.fechaFabricacion}
                  onChange={(e) => handleInputChange('fechaFabricacion', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="expiry">Fecha de Vencimiento *</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={formData.expiry}
                  onChange={(e) => handleInputChange('expiry', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="laboratorioFabricante">Laboratorio Fabricante *</Label>
                <Input
                  id="laboratorioFabricante"
                  value={formData.laboratorioFabricante}
                  onChange={(e) => handleInputChange('laboratorioFabricante', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Commercial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Comercial</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="precioCompra">Precio de Compra *</Label>
                <Input
                  id="precioCompra"
                  type="number"
                  step="0.01"
                  value={formData.precioCompra}
                  onChange={(e) => handleInputChange('precioCompra', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="precioVentaPublico">Precio de Venta al Público *</Label>
                <Input
                  id="precioVentaPublico"
                  type="number"
                  step="0.01"
                  value={formData.precioVentaPublico}
                  onChange={(e) => handleInputChange('precioVentaPublico', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="margenGanancia">Margen de Ganancia (%)</Label>
                <Input
                  id="margenGanancia"
                  type="number"
                  step="0.01"
                  value={formData.margenGanancia}
                  onChange={(e) => handleInputChange('margenGanancia', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="proveedorDistribuidor">Proveedor/Distribuidor *</Label>
                <Input
                  id="proveedorDistribuidor"
                  value={formData.proveedorDistribuidor}
                  onChange={(e) => handleInputChange('proveedorDistribuidor', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rotacionPromedio">Rotación Promedio (días)</Label>
                <Input
                  id="rotacionPromedio"
                  type="number"
                  value={formData.rotacionPromedio}
                  onChange={(e) => handleInputChange('rotacionPromedio', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="diasAnticipadoVencimiento">Días Anticipado Vencimiento</Label>
                <Input
                  id="diasAnticipadoVencimiento"
                  type="number"
                  value={formData.diasAnticipadoVencimiento}
                  onChange={(e) => handleInputChange('diasAnticipadoVencimiento', parseInt(e.target.value) || 60)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Guardar Producto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEntryForm;
