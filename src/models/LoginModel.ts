import { Pool, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IUser[]> {
    try {
      const query = 'SELECT * FROM Trybesmith.Users';
      const result = await this.connection.execute<RowDataPacket[]>(query);
      const [users] = result;
      return users as IUser[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição getAll do UsersModel.');
    }
  }
}
