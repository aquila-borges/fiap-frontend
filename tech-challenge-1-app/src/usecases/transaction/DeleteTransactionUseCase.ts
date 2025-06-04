import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";
import { IBankAccountRepository } from "@/core/repositories/IBankAccountRepository";
import { OperationTypeEnum } from "@/enums/operation-type.enum";

export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepo: ITransactionRepository,
    private readonly bankAccountRepo: IBankAccountRepository
  ) {}

  async execute(id: string): Promise<void> {
    // 1. Buscar a transação antes de deletar
    const transaction = await this.transactionRepo.findById(id);
    if (!transaction) {
      throw new Error(`Transaction with id ${id} not found`);
    }

    // 2. Buscar a conta bancária associada
    const bankAccount = await this.bankAccountRepo.findById(transaction.bankAccountId);
    if (!bankAccount) {
      throw new Error(`Bank account with id ${transaction.bankAccountId} not found`);
    }

    // 3. Reverter o valor da transação no saldo
    const { Income, Outcome } = OperationTypeEnum;
    const inferredType = transaction.amount >= 0 ? Income : Outcome;
    const normalizedAmount = Math.abs(transaction.amount);
    bankAccount.balance += inferredType === Outcome ? normalizedAmount : -normalizedAmount;

    // 4. Atualizar o saldo da conta
    console.log("Updating bank account balance to:", bankAccount.balance);
    await this.bankAccountRepo.update(transaction.bankAccountId, bankAccount);

    // 5. Excluir a transação
    await this.transactionRepo.delete(id);
  }
}