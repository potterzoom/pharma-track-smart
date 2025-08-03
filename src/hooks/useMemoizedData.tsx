
import { useMemo, useCallback } from 'react';

interface MemoizedDataHook<T> {
  data: T;
  refetch: () => void;
  isStale: boolean;
}

export const useMemoizedData = <T,>(
  computeFn: () => T,
  dependencies: any[],
  cacheTime: number = 300000 // 5 minutos por defecto
): MemoizedDataHook<T> => {
  
  const memoizedData = useMemo(() => {
    console.log('Computing expensive operation...');
    return {
      result: computeFn(),
      timestamp: Date.now()
    };
  }, dependencies);

  const isStale = useMemo(() => {
    return Date.now() - memoizedData.timestamp > cacheTime;
  }, [memoizedData.timestamp, cacheTime]);

  const refetch = useCallback(() => {
    // Forzar recálculo actualizando dependencias
    return computeFn();
  }, [computeFn]);

  return {
    data: memoizedData.result,
    refetch,
    isStale
  };
};

export default useMemoizedData;
