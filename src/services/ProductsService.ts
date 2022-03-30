import ProductsModel from '../models/ProductsModel';
import connection from '../models/connection';
import { IProduct, IProductOrder } from '../interfaces';

export default class ProductsService {
  public ProductsModel: ProductsModel;

  constructor() {
    this.ProductsModel = new ProductsModel(connection);
  }

  public async getAll(): Promise<IProductOrder[]> {
    const products: IProductOrder[] = await this.ProductsModel.getAll();
    return products;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const newProduct: IProduct = await this.ProductsModel.create(product);
    return newProduct;
  }
}
