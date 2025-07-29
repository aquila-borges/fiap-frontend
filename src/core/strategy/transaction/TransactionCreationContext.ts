import { ITransaction } from "@/core/entities/transaction/ITransaction";
import { ITransactionCreationStrategy } from "./ITransactionCreationStrategy";
import { CreateTransactionDTO } from "@/core/dto/transaction/CreateTransactionDTO";

export class TransactionCreationContext {
  constructor(private readonly strategies: ITransactionCreationStrategy[]) {}

  create(dto: CreateTransactionDTO): ITransaction {
    const strategy = this.strategies.find(s => s.supports(dto.type));
    if (!strategy) throw new Error("Tipo de transação não suportado.");
    return strategy.create(dto);
  }
}