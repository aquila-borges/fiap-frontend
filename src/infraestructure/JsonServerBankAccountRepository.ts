
import { IBankAccount } from '@/core/entities/bankAccount/IBankAccount';
import { IBankAccountRepository } from '@/core/repositories/IBankAccountRepository';

export class JsonServerBankAccountRepository implements IBankAccountRepository {
  private API_URL = 'http://localhost:3001/bankAccounts';

  async findById(bankAccountId: string): Promise<IBankAccount | null> {
    const res = await fetch(`${this.API_URL}/${bankAccountId}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      const errorText = await res.text();
      throw new Error(`Failed to fetch account by ID: ${res.status} - ${errorText}`);
    }

    return res.json();
  }

  async update(bankAccountId: string, data: Partial<IBankAccount>): Promise<void> {
    const res = await fetch(`${this.API_URL}/${bankAccountId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update account: ${res.status} - ${errorText}`);
    }
  }
}