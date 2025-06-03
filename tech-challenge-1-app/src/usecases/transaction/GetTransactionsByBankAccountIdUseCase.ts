import { TransactionResponseDTO } from "@/core/dto/transaction/TransactionResponseDTO";
import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";

export class GetTransactionsByBankAccountIdUseCase {
  constructor(private readonly repo: ITransactionRepository) {}

  async execute(bankAccountId: string): Promise<TransactionResponseDTO[]> {
    console.log("Fetching transactions with bank account ID:", bankAccountId);    
    const transactions = await this.repo.findByBankAccountId(bankAccountId);

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