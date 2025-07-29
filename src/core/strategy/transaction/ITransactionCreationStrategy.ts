import { CreateTransactionDTO } from "@/core/dto/transaction/CreateTransactionDTO";
import { ITransaction } from "@/core/entities/transaction/ITransaction";
import { TransactionTypeEnum } from "@/enums/transaction-type.enum";

export interface ITransactionCreationStrategy {
  supports(type: TransactionTypeEnum): boolean;
  create(dto: CreateTransactionDTO): ITransaction;
}