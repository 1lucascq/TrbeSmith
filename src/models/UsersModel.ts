import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IUser, ITokenPayload } from '../interfaces';

export default class UsersModel {
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

  public async create(userData: IUser): Promise<ITokenPayload> {
    try {
      const {
        username,
        classe,
        level,
        password,
      } = userData;
      const 
        q = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)';
      const result = await this.connection
        .execute<ResultSetHeader>(q, [username, classe, level, password]);
      const [dataInserted] = result;
      const { insertId } = dataInserted;
      return { id: insertId, username } as ITokenPayload;
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do UsersModel.');
    }
  }
}
