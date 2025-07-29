import { BankTransferStrategy } from '@/core/strategy/transaction/BankTransferStrategy';
import { CurrencyExchangeStrategy } from '@/core/strategy/transaction/CurrencyExchangeStrategy';
import { LoanStrategy } from '@/core/strategy/transaction/LoanStrategy';
import { TransactionCreationContext } from '@/core/strategy/transaction/TransactionCreationContext';
import { JsonServerBankAccountRepository } from '@/infraestructure/JsonServerBankAccountRepository';
import { JsonServerTransactionRepository } from '@/infraestructure/JsonServerTransactionRepository';
import { CreateTransactionUseCase } from '@/usecases/transaction/CreateTransactionUseCase';
import { GetAllTransactionsUseCase } from '@/usecases/transaction/GetAllTransactionsUseCase';
import { NextRequest, NextResponse } from 'next/server';

const transactionRepo = new JsonServerTransactionRepository();
const bankRepo = new JsonServerBankAccountRepository();

const context = new TransactionCreationContext([
  new BankTransferStrategy(),
  new LoanStrategy(),
  new CurrencyExchangeStrategy()
]);

const createUseCase = new CreateTransactionUseCase(transactionRepo, context, bankRepo);
const getAllUseCase = new GetAllTransactionsUseCase(transactionRepo);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const transaction = await createUseCase.execute(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const transactions = await getAllUseCase.execute();
    return NextResponse.json(transactions, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}