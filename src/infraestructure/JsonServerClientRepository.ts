import { IClient } from '@/core/entities/client/IClient';
import { IClientRepository } from '@/core/repositories/IClientRepository';

export class JsonServerClientRepository implements IClientRepository {
  private API_URL = 'http://localhost:3001/clients';

  async findById(id: string): Promise<IClient | null> {
    const res = await fetch(`${this.API_URL}/${id}`);

    if (!res.ok) {
      if (res.status === 404) return null;
      const errorText = await res.text();
      throw new Error(`Erro ao buscar cliente por id: ${res.status} - ${errorText}`);
    }

    return res.json();
  }
}