import { ITransaction } from "@/core/entities/transaction/ITransaction";
import { TransactionTypeEnum } from "@/enums/transaction-type.enum";
import crypto from "crypto";

export class BankTransfer implements ITransaction {
  constructor(
    public readonly id: string,
    public bankAccountId: string,
    public amount: number,
    public type: TransactionTypeEnum,
    public createdAt: Date,
    public updatedAt?: Date
  ) {}

  static create(data: Omit<ITransaction, 'id' | 'createdAt' | 'type'>): BankTransfer {
    return new BankTransfer(
      crypto.randomUUID(),
      data.bankAccountId,
      data.amount,
      TransactionTypeEnum.BankTransfer,
      new Date(),
      data.updatedAt
    );
  }
}