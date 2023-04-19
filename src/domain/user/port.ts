import { UserResponse, UserCreate } from './user';

export interface PrimaryHttpPort {
  listUser(): Promise<UserResponse[]>;
  createUser(data: UserCreate): Promise<boolean>;
}

export interface SecondaryStoragePort {
  listUser(): Promise<UserResponse[]>;
  createUser(data: UserCreate): Promise<boolean>;
}
