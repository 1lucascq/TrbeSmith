import UsersModel from '../models/UsersModel';
import connection from '../models/connection';
import { IUser, ITokenPayload } from '../interfaces';

export default class UsersService {
  public usersModel: UsersModel;

  constructor() {
    this.usersModel = new UsersModel(connection);
  }

  public async create(userData: IUser) {
    const newUserId: ITokenPayload = await this.usersModel.create(userData);
    return newUserId;
  }
}
