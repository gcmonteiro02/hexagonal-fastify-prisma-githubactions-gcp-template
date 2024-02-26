import { User } from './user';

type PrimaryHttpPort = {
  get(id: number): Promise<User>;
};

type SecondaryStoragePort = {
  getUserById(id: number): Promise<User>;
};

export { PrimaryHttpPort, SecondaryStoragePort };
