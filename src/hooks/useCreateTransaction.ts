import { useState } from "react";
import { TransactionResponseDTO } from "@/core/dto/transaction/TransactionResponseDTO";
import { CreateTransactionDTO } from "@/core/dto/transaction/CreateTransactionDTO";

export function useCreateTransaction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createTransaction({ type, amount, bankAccountId }: CreateTransactionDTO): Promise<TransactionResponseDTO | null> {
    setLoading(true);
    setError(null);

    try {
      if (amount === 0) {
        throw new Error("Amount cannot be zero");
      }

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, amount, bankAccountId }),
      });

      if (!response.ok) throw new Error("Failed to create transaction");

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    createTransaction,
    loading,
    error
  };
}