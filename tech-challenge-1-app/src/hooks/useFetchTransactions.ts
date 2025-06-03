import { useState, useEffect } from "react";
import { ITransaction } from "@/core/entities/transaction/ITransaction";
import { useSortedTransactions } from "./useSortedTransactions";

export function useFetchTransactions() {
  const [transactions, setTransactions] = useSortedTransactions<ITransaction>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/transactions", { signal });
      if (!res.ok) throw new Error("Erro ao buscar transações");

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Formato inválido de resposta da API");

      setTransactions(data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchTransactions(controller.signal);
    return () => controller.abort();
  }, []);

  return { transactions, setTransactions, loading, error, refetch: () => fetchTransactions() };
}