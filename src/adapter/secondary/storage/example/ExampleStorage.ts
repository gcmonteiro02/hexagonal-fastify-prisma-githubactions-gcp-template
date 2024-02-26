import { User } from '../../../../../src/core/domain/user/user';
import { ApplicationORM, ApplicationORMModel } from '../../../../../src/core/app/settings';

import { SecondaryStoragePort as SecondaryUserStoragePort } from '../../../../core/domain/user/port';

type ExampleStorageAdapterOptions = {
  ORM: ApplicationORM;
};
class ExampleStorage implements SecondaryUserStoragePort {
  constructor(private readonly adapter: ExampleStorageAdapterOptions) {}

  /**
   * Function to get a user by id
   * @param id
   * @returns User
   * @throws Error
   * @async
   */
  public async getUserById(id: number): Promise<User> {
    try {
      const resource = await this.adapter.ORM.getUnique(ApplicationORMModel.user, id);

      if (!resource) {
        throw new Error('User not found');
      }

      const user = resource as User;

      return user;
    } catch (error) {
      throw new Error(`Error occurred while trying to get user: ${error.message}`);
    }
  }
}

export { ExampleStorage };
