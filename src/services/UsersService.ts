import UsersModel from '../models/UsersModel';
import connection from '../models/connection';
import { IUser, ITokenData } from '../interfaces';

export default class UsersService {
  public usersModel: UsersModel;

  constructor() {
    this.usersModel = new UsersModel(connection);
  }

  public async create(userData: IUser) {
    const newUserId: ITokenData = await this.usersModel.create(userData);
    return newUserId;
  }
}
