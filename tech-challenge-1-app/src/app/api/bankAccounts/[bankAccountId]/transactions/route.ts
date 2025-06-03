import { JsonServerTransactionRepository } from "@/infraestructure/JsonServerTransactionRepository";
import { GetTransactionsByBankAccountIdUseCase } from "@/usecases/transaction/GetTransactionsByBankAccountIdUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { bankAccountId: string } | Promise<{ bankAccountId: string }> }) {
  try {
      const params = await context.params;
      const {bankAccountId} = params;

      if (!bankAccountId) {
        return NextResponse.json({ error: 'Bank account ID not provided' }, { status: 400 });
      }

      const repo = new JsonServerTransactionRepository();

      const useCase = new GetTransactionsByBankAccountIdUseCase(repo);
      
      const result = await useCase.execute(bankAccountId);
      return NextResponse.json(result);
  } catch (error: any) {
      console.error('Error fetching bank account:', error);
      return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}