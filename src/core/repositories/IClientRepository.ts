/**
 * Inversão de Dependência (D): 
 * Usamos uma interface para permitir que a lógica de negócio dependa de abstrações, não implementações.
 */
import { IClient } from "../entities/client/IClient";

export interface IClientRepository {
  findById(id: string): Promise<IClient | null>;
}