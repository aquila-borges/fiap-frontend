import { ClientWithBalanceResponseDTO } from "@/core/dto/client/ClientWithBalanceResponseDTO";
import { IBankAccountRepository } from "@/core/repositories/IBankAccountRepository";
import { IClientRepository } from "@/core/repositories/IClientRepository";

export class GetClientWithBalanceUseCase {
  constructor(
    private readonly clientRepo: IClientRepository,
    private readonly bankAccountRepo: IBankAccountRepository
  ) {}

  async execute(clientId: string): Promise<ClientWithBalanceResponseDTO> {
    console.log("Fetching client with ID:", clientId);
    const client = await this.clientRepo.findById(clientId);
    if (!client) throw new Error(`Client with ID ${clientId} not found`);

    const bankAccount = await this.bankAccountRepo.findById(client.bankAccountId);
    console.log("Fetching bank account with ID:", client.bankAccountId);
    if (!bankAccount) throw new Error(`Bank account with ID ${client.bankAccountId} not found`);

    return {
      name: client.name,
      cpfCnpj: client.cpfCnpj,
      bankAccount: {
        id: bankAccount.id,
        balance: bankAccount.balance,
      },
    } as ClientWithBalanceResponseDTO;
  }
}