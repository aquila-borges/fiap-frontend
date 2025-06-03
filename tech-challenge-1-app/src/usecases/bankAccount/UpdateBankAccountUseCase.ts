import { UpdateBankAccountDTO } from "@/core/dto/bankAccount/UpdateBankAccountDTO";
import { IBankAccountRepository } from "@/core/repositories/IBankAccountRepository";

export class UpdateBankAccountUseCase {
  constructor(private readonly repo: IBankAccountRepository) {}

  async execute(bankAccountId: string, data: UpdateBankAccountDTO): Promise<void> {
    console.log(`Updating bank account with id: ${bankAccountId}`);
    await this.repo.update(bankAccountId, data);
  }
}