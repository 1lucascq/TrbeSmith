import UsersModel from '../models/UsersModel';
import connection from '../models/connection';

export default class UsersService {
  public usersModel: UsersModel;

  constructor() {
    this.usersModel = new UsersModel(connection);
  }

  public async create(
    username: string,
    classe: string,
    level: number,
    password: string,
  ) {
    const newUser = await this.usersModel.create({ username, classe, level, password });
    return newUser;
  }
}
