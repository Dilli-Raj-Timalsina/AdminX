import { useState, useCallback } from "react";
import { store } from "@/lib/store/data";

export function useEntityStore(entityKey: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await store.list(entityKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      return [];
    } finally {
      setLoading(false);
    }
  }, [entityKey]);

  const getRecord = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        return await store.get(entityKey, id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [entityKey]
  );

  const createRecord = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        setError(null);
        return await store.create(entityKey, data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [entityKey]
  );

  const updateRecord = useCallback(
    async (id: string, data: any) => {
      try {
        setLoading(true);
        setError(null);
        return await store.update(entityKey, id, data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [entityKey]
  );

  const deleteRecord = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await store.delete(entityKey, id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [entityKey]
  );

  return {
    loading,
    error,
    listRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
  };
}
