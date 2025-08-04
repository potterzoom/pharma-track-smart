
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN'
}

export interface CustomError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: any;
  timestamp: number;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errorLog: CustomError[] = [];
  private readonly maxLogSize = 100;

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  createError(type: ErrorType, message: string, code?: string, details?: any): CustomError {
    const error: CustomError = {
      type,
      message,
      code,
      details,
      timestamp: Date.now()
    };

    this.logError(error);
    return error;
  }

  private logError(error: CustomError): void {
    // Mantener solo los últimos errores
    if (this.errorLog.length >= this.maxLogSize) {
      this.errorLog.shift();
    }
    
    this.errorLog.push(error);
    
    // Log detallado en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error [${error.type}]`);
      console.error(`Message: ${error.message}`);
      if (error.code) console.error(`Code: ${error.code}`);
      if (error.details) console.error('Details:', error.details);
      console.error(`Timestamp: ${new Date(error.timestamp).toISOString()}`);
      console.groupEnd();
    }
  }

  handleApiError(error: any): CustomError {
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      if (status === 401) {
        return this.createError(ErrorType.AUTHENTICATION, 'Credenciales inválidas', 'AUTH_001');
      } else if (status === 403) {
        return this.createError(ErrorType.AUTHORIZATION, 'Acceso denegado', 'AUTH_002');
      } else if (status >= 400 && status < 500) {
        return this.createError(ErrorType.CLIENT, message, `CLIENT_${status}`);
      } else if (status >= 500) {
        return this.createError(ErrorType.SERVER, 'Error del servidor', `SERVER_${status}`, error.response.data);
      }
    } else if (error.request) {
      // Error de red
      return this.createError(ErrorType.NETWORK, 'Error de conexión', 'NETWORK_001');
    }
    
    return this.createError(ErrorType.UNKNOWN, error.message || 'Error desconocido', 'UNKNOWN_001', error);
  }

  getErrorMessage(error: CustomError): string {
    const errorMessages = {
      [ErrorType.VALIDATION]: '⚠️ Error de validación',
      [ErrorType.NETWORK]: '🌐 Error de conexión',
      [ErrorType.AUTHENTICATION]: '🔐 Error de autenticación',
      [ErrorType.AUTHORIZATION]: '🚫 Acceso denegado',
      [ErrorType.SERVER]: '🔧 Error del servidor',
      [ErrorType.CLIENT]: '📱 Error de cliente',
      [ErrorType.UNKNOWN]: '❓ Error desconocido'
    };

    return `${errorMessages[error.type] || errorMessages[ErrorType.UNKNOWN]}: ${error.message}`;
  }

  getErrorLog(): CustomError[] {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
    console.log('Error log cleared');
  }

  // Método para notificar errores críticos
  notifyCriticalError(error: CustomError): void {
    if (error.type === ErrorType.SERVER || error.type === ErrorType.AUTHENTICATION) {
      // En producción, aquí se podría enviar a un servicio de monitoreo
      console.error('Critical error detected:', error);
    }
  }
}

export const errorHandler = ErrorHandler.getInstance();

// Hook para usar el error handler en componentes
export const useErrorHandler = () => {
  const handleError = (error: any): CustomError => {
    const customError = errorHandler.handleApiError(error);
    errorHandler.notifyCriticalError(customError);
    return customError;
  };

  const createValidationError = (message: string, details?: any): CustomError => {
    return errorHandler.createError(ErrorType.VALIDATION, message, 'VALIDATION_001', details);
  };

  const getErrorMessage = (error: CustomError): string => {
    return errorHandler.getErrorMessage(error);
  };

  return {
    handleError,
    createValidationError,
    getErrorMessage,
    clearLog: () => errorHandler.clearErrorLog(),
    getLog: () => errorHandler.getErrorLog()
  };
};

export default errorHandler;
