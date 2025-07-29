import { ITransaction } from "../../entities/transaction/ITransaction";

export interface CreateTransactionDTO extends Pick<ITransaction, 'amount' | 'type' | 'bankAccountId'> {}