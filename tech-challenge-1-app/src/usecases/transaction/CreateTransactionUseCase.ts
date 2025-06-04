import { CreateTransactionDTO } from "@/core/dto/transaction/CreateTransactionDTO";
import { TransactionResponseDTO } from "@/core/dto/transaction/TransactionResponseDTO";
import { IBankAccountRepository } from "@/core/repositories/IBankAccountRepository";
import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";
import { TransactionCreationContext } from "@/core/strategy/transaction/TransactionCreationContext";
import { OperationTypeEnum } from "@/enums/operation-type.enum";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly creationContext: TransactionCreationContext,
    private readonly bankAccountRepo: IBankAccountRepository
  ) {}

  async execute(dto: CreateTransactionDTO): Promise<TransactionResponseDTO> {
    const transaction = this.creationContext.create(dto);
    console.log("Creating transaction entity:", transaction);
    const created = await this.transactionRepo.create(transaction);

     // 1. Recalcular saldo
    const bankAccount = await this.bankAccountRepo.findById(dto.bankAccountId);
    if (!bankAccount) {
      throw new Error(`Bank account with ID ${dto.bankAccountId} not found!`);
    }
    const { Income, Outcome } = OperationTypeEnum;
    const inferredType = dto.amount >= 0 ? Income : Outcome;
    const normalizedAmount = Math.abs(dto.amount);
    bankAccount.balance += inferredType === Income ? normalizedAmount : -normalizedAmount;
    
    // 2. Atualizar conta bancária
    console.log("Updating bank account balance to:", bankAccount.balance);
    await this.bankAccountRepo.update(dto.bankAccountId, bankAccount);
    
    return {
      bankAccountId: created.bankAccountId,
      amount: created.amount,
      type: created.type,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt
    } as TransactionResponseDTO;
  }
}