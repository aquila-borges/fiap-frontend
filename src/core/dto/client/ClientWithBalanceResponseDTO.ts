export interface ClientWithBalanceResponseDTO {
  name: string;
  cpfCnpj: string;
  bankAccount: {
    id: string;
    balance: number;
  };
}