import { Pool } from 'mysql2/promise';
import { IUser } from '../interfaces';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(userData: IUser): Promise<void> {
    try {
      const {
        username,
        classe,
        level,
        password,
      } = userData;
      const 
        q = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)';
      await this.connection.execute(q, [username, classe, level, password]);
      return;
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do UsersModel.');
    }
  }
}
