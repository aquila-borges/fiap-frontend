import { TransactionResponseDTO } from "@/core/dto/transaction/TransactionResponseDTO";
import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";

export class GetAllTransactionsUseCase {
  constructor(private readonly repo: ITransactionRepository) {}

  async execute(): Promise<TransactionResponseDTO[]> {
    console.log("Fetching all transactions");
    const transactions = await this.repo.findAll();

    return transactions.map((tx) => ({
      id: tx.id,
      bankAccountId: tx.bankAccountId,
      amount: tx.amount,
      type: tx.type,
      createdAt: tx.createdAt,
      updatedAt: tx.updatedAt,
    })) as TransactionResponseDTO[];
  }
}