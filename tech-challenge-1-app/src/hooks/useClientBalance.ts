import { useEffect, useState, useCallback } from "react";

interface ClientBalance {
  name: string;
  cpfCnpj: string;
  account: {
    id: string;
    balance: number;
  };
}

export function useClientBalance(clientId: string) {
  const [data, setData] = useState<ClientBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    if (!clientId) return;

    try {
      setLoading(true);
      setError(null);
      setData(null);

      const res = await fetch(`/api/clients/${clientId}/balance`, {
        signal,
      });

      if (!res.ok) throw new Error("Erro ao buscar saldo do cliente");

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message ?? "Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData() };
}