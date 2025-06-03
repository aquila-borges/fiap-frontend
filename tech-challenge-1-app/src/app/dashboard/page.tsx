import DashboardBankStatment from "@/components/dashboard/DashboardBankStatement/BankStatement";
import DashboardBalance from "@/components/dashboard/DashboardBalance/DashboardBalance";
import DashboardHeader from "@/components/layout/AuthenticatedHeader/Header";
import DashboardMenu from "@/components/dashboard/DashboardMenu/MenuDashboard";
import DashboardTransaction from "@/components/dashboard/DashboardTransaction/DashboardTransaction";
import { ClientWithBalanceResponseDTO } from "@/core/dto/client/ClientWithBalanceResponseDTO";
import { TransactionResponseDTO } from "@/core/dto/transaction/TransactionResponseDTO";

export const dynamic = "force-dynamic"; // Garante que será SSR

async function getClientBalance(clientId: string): Promise<ClientWithBalanceResponseDTO> {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3001";

  const res = await fetch(`${baseUrl}/clients/${clientId}/balance`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Erro ao buscar cliente:", res.status, await res.text());
    throw new Error("Erro ao buscar dados do cliente");
  }

  return res.json();
}

async function getTransactions(bankAccountId: string): Promise<TransactionResponseDTO[]> {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3001";

  const res = await fetch(`${baseUrl}/transactions?bankAccountId=${bankAccountId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Error fetching transactions:", res.status, await res.text());
    throw new Error("Error fetching transactions");
  }

  return res.json();
}

export default async function Dashboard() {
  const clientId = "053d9b81-a669-40da-99a3-97019861a164";
  const clientBalance = await getClientBalance(clientId);
  const transactions = await getTransactions(clientBalance.bankAccount.id);

  return (
    <div className="min-h-screen flex flex-col gap-y-7">
      <DashboardHeader />
      <main className="flex justify-center flex-grow">
        <div className="container mx-4 flex flex-col flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-6 h-full">
            <div className="sm:col-span-2 flex justify-end">
              <DashboardMenu />
            </div>

            <div className="sm:col-span-7">
              <div className="grid grid-cols-1 gap-y-6 h-full">
                <DashboardBalance data={clientBalance} />
                <DashboardTransaction bankAccountId={clientBalance.bankAccount.id} />
              </div>
            </div>

            <div className="sm:col-span-3 flex justify-end max-h-screen">
               <DashboardBankStatment data={transactions}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}