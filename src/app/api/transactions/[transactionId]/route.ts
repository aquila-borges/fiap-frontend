import { JsonServerBankAccountRepository } from '@/infraestructure/JsonServerBankAccountRepository';
import { JsonServerTransactionRepository } from '@/infraestructure/JsonServerTransactionRepository';
import { DeleteTransactionUseCase } from '@/usecases/transaction/DeleteTransactionUseCase';
import { UpdateTransactionUseCase } from '@/usecases/transaction/UpdateTransactionUseCase';
import { NextRequest, NextResponse } from 'next/server';

const transactionRepo = new JsonServerTransactionRepository();
const bankAccountRepo = new JsonServerBankAccountRepository();

const deleteUseCase = new DeleteTransactionUseCase(transactionRepo, bankAccountRepo);
const updateUseCase = new UpdateTransactionUseCase(transactionRepo, bankAccountRepo);

export async function DELETE(
  req: NextRequest,
  context: { params: { transactionId: string } | Promise<{ transactionId: string }> }
) {
  try {
    const params = await context.params;
    const { transactionId } = params;

    if (!transactionId) {
      return NextResponse.json({ error: 'Transaction ID not provided' }, { status: 400 });
    }

    await deleteUseCase.execute(transactionId);

    return NextResponse.json({ message: 'Transaction successfully deleted' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { transactionId: string } | Promise<{ transactionId: string }> }
) {
  try {
    const params = await context.params;
    const { transactionId } = params;

    if (!transactionId) {
      return NextResponse.json({ error: 'Transaction ID not provided' }, { status: 400 });
    }

    const body = await req.json();

    await updateUseCase.execute(transactionId, body);

    return NextResponse.json({ message: 'Transaction successfully updated' }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}