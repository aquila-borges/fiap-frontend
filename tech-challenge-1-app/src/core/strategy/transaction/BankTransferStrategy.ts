
import { BankTransfer } from "@/core/entities/transaction/BankTransfer";
import { ITransaction } from "@/core/entities/transaction/ITransaction";
import { TransactionTypeEnum } from "@/enums/transaction-type.enum";
import { ITransactionCreationStrategy } from "./ITransactionCreationStrategy";
import { CreateTransactionDTO } from "@/core/dto/transaction/CreateTransactionDTO";

export class BankTransferStrategy implements ITransactionCreationStrategy {
  supports(type: TransactionTypeEnum): boolean {
    return type === TransactionTypeEnum.BankTransfer;
  }

  create(dto: CreateTransactionDTO): ITransaction {
    return BankTransfer.create(dto);
  }
}