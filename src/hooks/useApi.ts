import { useState, useEffect, SetStateAction } from 'react';

export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

const useApi = <T>(url: string, options: RequestInit = {}): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error as SetStateAction<Error | null>);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
    
  return { data, error, loading };
};

export default useApi;
