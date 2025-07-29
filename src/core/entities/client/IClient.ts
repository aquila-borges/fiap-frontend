
export interface IClient {
    readonly id: string; // ID único do usuário
    cpfCnpj: string;
    name: string;
    bankAccountId: string; // Conta bancária associada ao usuário
    cellphone: string;
    email: string;
}