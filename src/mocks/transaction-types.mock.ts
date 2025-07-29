import { TransactionTypeEnum } from "@/enums/transaction-type.enum";

export interface ITransactionTypeOption {
  id: string;
  value: string; 
  type: TransactionTypeEnum; // valor técnico
}

export const transactionTypeOptions: ITransactionTypeOption[] = [
  {
    id: '1',
    value: 'Câmbio de moeda',
    type: TransactionTypeEnum.CurrencyExchange
  },
  {
    id: '2',
    value: 'DOC/TED',
    type: TransactionTypeEnum.BankTransfer
  },
  {
    id: '3',
    value: 'Empréstimo e Financiamento',
    type: TransactionTypeEnum.Loan
  }
];