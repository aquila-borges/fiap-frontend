/**
 * Inversão de Dependência (D): 
 * Usamos uma interface para permitir que a lógica de negócio dependa de abstrações, não implementações.
 */
import { IBankAccount } from "../entities/bankAccount/IBankAccount";

export interface IBankAccountRepository {
  findById(bankAccountId: string): Promise<IBankAccount | null>;
  update(bankAccountId: string, data: Partial<IBankAccount>): Promise<void>;
}