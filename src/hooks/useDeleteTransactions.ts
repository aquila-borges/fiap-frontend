import { TransactionResponseDTO } from "@/core/dto/transaction/TransactionResponseDTO";
import { useCallback, useState } from "react";

export function useDeleteTransactions(
  setTransactions: React.Dispatch<React.SetStateAction<TransactionResponseDTO[]>>
) {
  const [loading, setLoading] = useState(false);

  const deleteTransactions = useCallback(async (ids: string[]) => {
    setLoading(true);
    const failedIds: string[] = [];
    const successfullyDeletedIds: string[] = [];

    try {
      for (const id of ids) {
        try {
          const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
          if (!res.ok) {
            console.error(`Erro ao excluir transação com id ${id}: ${res.statusText}`);
            failedIds.push(id);
          } else {
            successfullyDeletedIds.push(id);
          }
        } catch (err) {
          console.error(`Erro inesperado ao excluir transação com id ${id}:`, err);
          failedIds.push(id);
        }
      }

      if (successfullyDeletedIds.length > 0) {
        setTransactions((prev) =>
          prev.filter((t) => !successfullyDeletedIds.includes(t.id))
        );
      }

      if (failedIds.length > 0) {
        console.warn("Não foi possível excluir os seguintes IDs:", failedIds);
        // Exemplo: toast.warning(`Falha ao excluir ${failedIds.length} transações.`);
        return false;
      }

      return true;
    } finally {
      setLoading(false);
    }
  }, [setTransactions]);

  return { deleteTransactions, loading };
}