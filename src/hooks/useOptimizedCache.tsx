
import { useState, useCallback, useEffect, useRef } from 'react';

interface CacheConfig {
  ttl?: number; // Time to live en milisegundos
  maxSize?: number; // Máximo número de elementos en cache
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  accessCount: number;
}

export const useOptimizedCache = <T,>(config: CacheConfig = {}) => {
  const { ttl = 300000, maxSize = 100 } = config; // 5 minutos por defecto
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());
  const [, forceUpdate] = useState({});

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  const isExpired = useCallback((entry: CacheEntry<T>) => {
    return Date.now() - entry.timestamp > ttl;
  }, [ttl]);

  const set = useCallback((key: string, data: T) => {
    const cache = cacheRef.current;
    
    // Si el cache está lleno, remover el elemento menos usado
    if (cache.size >= maxSize) {
      let leastUsedKey = '';
      let leastUsedCount = Infinity;
      
      cache.forEach((entry, cacheKey) => {
        if (entry.accessCount < leastUsedCount) {
          leastUsedCount = entry.accessCount;
          leastUsedKey = cacheKey;
        }
      });
      
      if (leastUsedKey) {
        cache.delete(leastUsedKey);
      }
    }

    cache.set(key, {
      data,
      timestamp: Date.now(),
      accessCount: 1
    });

    console.log(`Cache set: ${key} (total items: ${cache.size})`);
    triggerUpdate();
  }, [maxSize, triggerUpdate]);

  const get = useCallback((key: string): T | null => {
    const cache = cacheRef.current;
    const entry = cache.get(key);

    if (!entry) {
      return null;
    }

    if (isExpired(entry)) {
      cache.delete(key);
      console.log(`Cache expired and removed: ${key}`);
      triggerUpdate();
      return null;
    }

    // Incrementar contador de acceso
    entry.accessCount++;
    console.log(`Cache hit: ${key} (access count: ${entry.accessCount})`);
    return entry.data;
  }, [isExpired, triggerUpdate]);

  const has = useCallback((key: string): boolean => {
    const cache = cacheRef.current;
    const entry = cache.get(key);
    
    if (!entry) return false;
    
    if (isExpired(entry)) {
      cache.delete(key);
      triggerUpdate();
      return false;
    }
    
    return true;
  }, [isExpired, triggerUpdate]);

  const clear = useCallback(() => {
    cacheRef.current.clear();
    console.log('Cache cleared');
    triggerUpdate();
  }, [triggerUpdate]);

  const remove = useCallback((key: string) => {
    const deleted = cacheRef.current.delete(key);
    if (deleted) {
      console.log(`Cache removed: ${key}`);
      triggerUpdate();
    }
    return deleted;
  }, [triggerUpdate]);

  const getStats = useCallback(() => {
    const cache = cacheRef.current;
    return {
      size: cache.size,
      maxSize,
      ttl,
      keys: Array.from(cache.keys())
    };
  }, [maxSize, ttl]);

  // Limpiar entradas expiradas periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      const cache = cacheRef.current;
      const keysToRemove: string[] = [];

      cache.forEach((entry, key) => {
        if (isExpired(entry)) {
          keysToRemove.push(key);
        }
      });

      if (keysToRemove.length > 0) {
        keysToRemove.forEach(key => cache.delete(key));
        console.log(`Cache cleanup: removed ${keysToRemove.length} expired entries`);
        triggerUpdate();
      }
    }, ttl / 2); // Limpiar cada media TTL

    return () => clearInterval(interval);
  }, [ttl, isExpired, triggerUpdate]);

  return {
    set,
    get,
    has,
    clear,
    remove,
    getStats
  };
};

export default useOptimizedCache;
