import { TransactionTypeEnum } from "@/enums/transaction-type.enum";

/**
 * Responsabilidade Única (S):
 * A entidade Transaction representa uma única transação financeira.
 */
export interface ITransaction {
  readonly id: string;
  bankAccountId: string;
  amount: number;
  type: TransactionTypeEnum;
  createdAt: Date;
  updatedAt?: Date;
}