import { UserCreate, UserResponse } from './user';
import { SecondaryStoragePort, PrimaryHttpPort } from './port';

export type UserServiceAdapterOptions = {
  storage: SecondaryStoragePort;
}

export default class Service implements PrimaryHttpPort {
  constructor(private readonly adapter: UserServiceAdapterOptions) { }

  public async createUser(data: UserCreate): Promise<boolean> {
    return this.adapter.storage.createUser(data)
  }

  public async listUser(): Promise<UserResponse[]> {
    return this.adapter.storage.listUser();
  }
}
