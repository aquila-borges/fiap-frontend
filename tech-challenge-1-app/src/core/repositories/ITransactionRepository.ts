/**
 * Inversão de Dependência (D): 
 * Usamos uma interface para permitir que a lógica de negócio dependa de abstrações, não implementações.
 */
import { ITransaction } from "@/core/entities/transaction/ITransaction";

export interface ITransactionRepository {
  create(transaction: ITransaction): Promise<ITransaction>;
  findAll(): Promise<ITransaction[]>;
  findById(transactionId: string): Promise<ITransaction | null>;
  findByBankAccountId(bankAccountId: string): Promise<ITransaction[]>;
  update(transactionId: string, data: Partial<ITransaction>): Promise<void>;
  delete(transactionId: string): Promise<void>;
}