import { IBankAccount } from "@/core/entities/bankAccount/IBankAccount";

export type UpdateBankAccountDTO = Partial<Pick<IBankAccount, 'balance'>>;