
import { useState, useCallback } from 'react';

interface ValidationRule {
  field: string;
  rule: (value: any) => boolean;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export const useValidation = (rules: ValidationRule[]) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validate = useCallback((data: Record<string, any>) => {
    const newErrors: ValidationError[] = [];

    rules.forEach(rule => {
      const value = data[rule.field];
      if (!rule.rule(value)) {
        newErrors.push({
          field: rule.field,
          message: rule.message
        });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [rules]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getError = useCallback((field: string) => {
    return errors.find(error => error.field === field)?.message;
  }, [errors]);

  const hasError = useCallback((field: string) => {
    return errors.some(error => error.field === field);
  }, [errors]);

  return {
    errors,
    validate,
    clearErrors,
    getError,
    hasError,
    isValid: errors.length === 0
  };
};

// Reglas de validación comunes
export const commonValidationRules = {
  required: (field: string) => ({
    field,
    rule: (value: any) => value !== null && value !== undefined && value !== '',
    message: 'Este campo es requerido'
  }),
  
  email: (field: string) => ({
    field,
    rule: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ''),
    message: 'Formato de email inválido'
  }),
  
  phone: (field: string) => ({
    field,
    rule: (value: string) => /^\d{3}-\d{3}-\d{4}$/.test(value || ''),
    message: 'Formato de teléfono inválido (xxx-xxx-xxxx)'
  }),
  
  minLength: (field: string, min: number) => ({
    field,
    rule: (value: string) => (value || '').length >= min,
    message: `Debe tener al menos ${min} caracteres`
  }),
  
  numeric: (field: string) => ({
    field,
    rule: (value: any) => !isNaN(Number(value)) && Number(value) >= 0,
    message: 'Debe ser un número válido'
  }),
  
  dateFormat: (field: string) => ({
    field,
    rule: (value: string) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    message: 'Formato de fecha inválido'
  })
};

export default useValidation;
