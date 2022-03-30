import { Pool } from 'mysql2/promise';
import { INewUser } from '../interfaces';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(newUser: INewUser): Promise<void> {
    try {
      const {
        username,
        classe,
        level,
        password,
      } = newUser;
      const query = 'INSERT INTO Users (username, classe, level, password) VALUES (?, ?, ?, ?)';
      await this.connection.execute(query, [username, classe, level, password]);
      return;
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do model.');
    }
  }
}
