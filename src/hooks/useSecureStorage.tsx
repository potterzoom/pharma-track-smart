
import { useState, useEffect } from 'react';

interface SecureStorageOptions {
  encrypt?: boolean;
  expiryTime?: number; // en milisegundos
}

export const useSecureStorage = (key: string, defaultValue: any, options: SecureStorageOptions = {}) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return defaultValue;

      const parsedItem = JSON.parse(item);
      
      // Verificar expiración si está configurada
      if (options.expiryTime && parsedItem.timestamp) {
        const isExpired = Date.now() - parsedItem.timestamp > options.expiryTime;
        if (isExpired) {
          window.localStorage.removeItem(key);
          return defaultValue;
        }
        return parsedItem.value;
      }
      
      return parsedItem.value || parsedItem;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      
      const itemToStore = options.expiryTime 
        ? { value, timestamp: Date.now() }
        : { value };

      window.localStorage.setItem(key, JSON.stringify(itemToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(defaultValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

export default useSecureStorage;
