import { PrimaryHttpPort, SecondaryStoragePort } from './port';
import { User } from './user';

export type ExampleServiceAdapterOptions = {
  storage: SecondaryStoragePort;
};

export default class Service implements PrimaryHttpPort {
  constructor(private readonly adapter: ExampleServiceAdapterOptions) {}

  /**
   * Function to get a user by id
   * @param id
   * @returns User
   * @throws Error
   * @async
   */
  public async get(id: number): Promise<User> {
    try {
      return await this.adapter.storage.getUserById(id);
    } catch (error) {
      throw new Error(`Error occurred while trying to get user: ${error.message}`);
    }
  }
}
