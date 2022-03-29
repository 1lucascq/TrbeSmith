import ProductsModel from '../models/ProductsModel';
import connection from '../models/connection';
import { IProduct } from '../interfaces';

export default class ProductsService {
  public ProductsModel: ProductsModel;

  constructor() {
    this.ProductsModel = new ProductsModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    const products: IProduct[] = await this.ProductsModel.getAll();
    return products;
  }
}
