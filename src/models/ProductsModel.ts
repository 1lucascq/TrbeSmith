import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IProduct, IProductOrder } from '../interfaces';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProductOrder[]> {
    try {
      const query = 'SELECT * FROM Trybesmith.Products';
      const result = await this.connection.execute<RowDataPacket[]>(query);
      const [users] = result;
      return users as IProductOrder[];
    } catch (err) {
      throw new Error('Erro do servidor na requisição getAll do ProductsModel.');
    }
  }

  public async create(product: IProduct): Promise<IProduct> {
    try {
      const { name, amount } = product;
      const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
      // Não acha ResultSetHeader...
      const result = await this.connection.execute<ResultSetHeader>(query, [name, amount]);
      const [dataInserted] = result;
      const { insertId } = dataInserted;
      return { id: insertId, ...product };
    } catch (err) {
      throw new Error('Erro do servidor na requisição create do ProductsModel.');
    }
  }
}
