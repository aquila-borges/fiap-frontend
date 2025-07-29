import { CreateTransactionDTO } from "@/core/dto/transaction/CreateTransactionDTO";
import { ITransaction } from "@/core/entities/transaction/ITransaction";
import { TransactionTypeEnum } from "@/enums/transaction-type.enum";
import { ITransactionCreationStrategy } from "./ITransactionCreationStrategy";
import { Loan } from "@/core/entities/transaction/Loan";

export class LoanStrategy implements ITransactionCreationStrategy {
  supports(type: TransactionTypeEnum): boolean {
    return type === TransactionTypeEnum.Loan;
  }

  create(dto: CreateTransactionDTO): ITransaction {
    return Loan.create(dto);
  }
}