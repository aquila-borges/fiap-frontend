import { JsonServerBankAccountRepository } from "@/infraestructure/JsonServerBankAccountRepository";
import { JsonServerClientRepository } from "@/infraestructure/JsonServerClientRepository";
import { GetClientWithBalanceUseCase } from "@/usecases/client/GetClientWithBalanceUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { clientId: string } | Promise<{ clientId: string }> }
) {
  try {
    const params = await context.params;
    const {clientId} = params;

    if (!clientId) {
      return NextResponse.json({ error: 'Client ID not provided' }, { status: 400 });
    }

    const clientRepo = new JsonServerClientRepository();
    const bankAccountRepo = new JsonServerBankAccountRepository();

    const useCase = new GetClientWithBalanceUseCase(
      clientRepo,
      bankAccountRepo
    );

    const result = await useCase.execute(clientId);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching client with balance:', error);
    return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}