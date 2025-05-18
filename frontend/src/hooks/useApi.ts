import { useState, useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

// Хук для удобной работы с API-запросами
interface ApiHookState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

type ApiFunction<T, P = any> = (params?: P) => Promise<T>;

export function useApi<T, P = any>(apiFunction: ApiFunction<T, P>) {
  const [state, setState] = useState<ApiHookState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (params?: P) => {
      try {
        setState({ data: null, isLoading: true, error: null });
        const data = await apiFunction(params);
        setState({ data, isLoading: false, error: null });
        return { data, error: null };
      } catch (err) {
        const error = err as AxiosError<{message?: string}>;
        const errorMessage = 
          error.response?.data?.message || 
          error.message || 
          'Произошла ошибка при выполнении запроса';
        
        setState({ data: null, isLoading: false, error: errorMessage });
        return { data: null, error: errorMessage };
      }
    },
    [apiFunction]
  );

  return {
    ...state,
    execute,
  };
}
