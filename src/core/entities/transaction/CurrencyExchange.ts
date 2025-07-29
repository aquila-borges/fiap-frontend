import { TransactionTypeEnum } from "@/enums/transaction-type.enum";
import { ITransaction } from "./ITransaction";
import crypto from "crypto";

export class CurrencyExchange implements ITransaction {
  constructor(
    public readonly id: string,
    public bankAccountId: string,
    public amount: number,
    public type: TransactionTypeEnum,
    public createdAt: Date,
    public updatedAt?: Date
  ) {}

  static create(data: Omit<ITransaction, 'id' | 'createdAt' | 'type'>): CurrencyExchange {
    return new CurrencyExchange(
      crypto.randomUUID(),
      data.bankAccountId,
      data.amount,
      TransactionTypeEnum.CurrencyExchange,
      new Date(),
      data.updatedAt
    );
  }
}