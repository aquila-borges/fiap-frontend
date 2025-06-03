import { ITransaction } from "../../entities/transaction/ITransaction";

export type UpdateTransactionDTO = Partial<Pick<ITransaction, 'amount' | 'type'>>;