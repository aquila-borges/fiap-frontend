import { CreateTransactionDTO } from "@/core/dto/transaction/CreateTransactionDTO";
import { ITransaction } from "@/core/entities/transaction/ITransaction";
import { TransactionTypeEnum } from "@/enums/transaction-type.enum";
import { ITransactionCreationStrategy } from "./ITransactionCreationStrategy";
import { CurrencyExchange } from "@/core/entities/transaction/CurrencyExchange";

export class CurrencyExchangeStrategy implements ITransactionCreationStrategy {
  supports(type: TransactionTypeEnum): boolean {
    return type === TransactionTypeEnum.CurrencyExchange;
  }

  create(dto: CreateTransactionDTO): ITransaction {
    return CurrencyExchange.create(dto);
  }
}