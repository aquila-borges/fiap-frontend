import { BankAccountResponseDTO } from "@/core/dto/bankAccount/BankAccountResponseDTO";
import { IBankAccountRepository } from "@/core/repositories/IBankAccountRepository";

export class GetBankAccountUseCase {
  constructor(private readonly repo: IBankAccountRepository) {}

  async execute(bankAccountId: string): Promise<BankAccountResponseDTO> {
    if (!bankAccountId) {
      throw new Error("Bank account ID is required");
    }          

    console.log(`Fetching bank account with id: ${bankAccountId}`);
    const bankAccount = await this.repo.findById(bankAccountId);
     
    if (!bankAccount) throw new Error(`Bank account with ID ${bankAccountId} not found`);
    const { id, balance } = bankAccount;

    return {
      id,
      balance     
    } as BankAccountResponseDTO;
  }
}