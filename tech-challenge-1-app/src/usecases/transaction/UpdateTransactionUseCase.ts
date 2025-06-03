import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";
import { IBankAccountRepository } from "@/core/repositories/IBankAccountRepository";
import { UpdateTransactionDTO } from "@/core/dto/transaction/UpdateTransactionDTO";
import { OperationTypeEnum } from "@/enums/operation-type.enum";

export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly bankAccountRepo: IBankAccountRepository
  ) {}

  async execute(transactionId: string, data: UpdateTransactionDTO): Promise<void> {
    // 1. Buscar a transação atual
    const existingTransaction = await this.transactionRepo.findById(transactionId);
    if (!existingTransaction) {
      throw new Error(`Transaction with id ${transactionId} not found`);
    }

    // 2. Buscar a conta bancária associada
    const bankAccount = await this.bankAccountRepo.findById(existingTransaction.bankAccountId);
    if (!bankAccount) {
      throw new Error(`Bank account with id ${existingTransaction.bankAccountId} not found`);
    }

    const { Income, Outcome } = OperationTypeEnum;

    // 3. Reverter valor antigo
    const oldInferredType = existingTransaction.amount >= 0 ? Income : Outcome;
    const oldNormalizedAmount = Math.abs(existingTransaction.amount);
    bankAccount.balance += oldInferredType === Outcome ? oldNormalizedAmount : -oldNormalizedAmount;

    // 4. Aplicar novo valor
    if (typeof data.amount !== "number") {
      throw new Error("The 'amount' field in UpdateTransactionDTO is required.");
    }
    const newInferredType = data.amount >= 0 ? Income : Outcome;
    const newNormalizedAmount = Math.abs(data.amount);
    bankAccount.balance += newInferredType === Outcome ? -newNormalizedAmount : newNormalizedAmount;

    // 5. Atualizar saldo da conta
    console.log("Updating bank account balance:", bankAccount.balance);
    await this.bankAccountRepo.update(bankAccount.id, bankAccount);

    // 6. Atualizar transação
    await this.transactionRepo.update(transactionId, data);
  }
}