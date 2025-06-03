import { TransactionResponseDTO } from "@/core/dto/transaction/TransactionResponseDTO";
import { useCallback, useState } from "react";

export function useDeleteTransactions(
  setTransactions: React.Dispatch<React.SetStateAction<TransactionResponseDTO[]>>
) {
  const [loading, setLoading] = useState(false);

  const deleteTransactions = useCallback(async (ids: string[]) => {
    setLoading(true);
    try {
      await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error(`Erro ao excluir transação com id ${id}`);
        })
      );
      setTransactions((prev) => prev.filter((t) => !ids.includes(t.id)));
      return true;
    } catch (error: any) {
      console.error("Erro ao excluir transações:", error.message || error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setTransactions]);

  return { deleteTransactions, loading };
}