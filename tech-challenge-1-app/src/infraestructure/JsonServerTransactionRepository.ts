import { ITransaction } from '@/core/entities/transaction/ITransaction';
import { ITransactionRepository } from '@/core/repositories/ITransactionRepository';

export class JsonServerTransactionRepository implements ITransactionRepository {
  private API_URL = 'http://localhost:3001/transactions';

  async create(transaction: ITransaction): Promise<ITransaction> {
    const res = await fetch(this.API_URL, {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao criar transação: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async findAll(): Promise<ITransaction[]> {
    const res = await fetch(this.API_URL);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao buscar transações: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async findById(id: string): Promise<ITransaction | null> {
    const res = await fetch(`${this.API_URL}/${id}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      const errorText = await res.text();
      throw new Error(`Erro ao buscar transação por id: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async update(id: string, data: Partial<ITransaction>): Promise<void> {
    const res = await fetch(`${this.API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString(),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao atualizar transação: ${res.status} - ${errorText}`);
    }
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro ao deletar transação: ${res.status} - ${errorText}`);
    }
  }

  async findByBankAccountId(bankAccountId: string): Promise<ITransaction[]> {
    const res = await fetch(`${this.API_URL}/transactions?bankAccountId=${bankAccountId}`);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error fetching transactions by bankAccountId: ${res.status} - ${errorText}`);
    }

    return res.json();
  }
}