import { SecondaryStoragePort } from '../../../src/core/domain/user/port';
import { IWebFramework } from '../../adapter/secondary/frameworks/fastify';

export enum mode {
  development = 'development',
  production = 'production'
}

export enum ApplicationORMModel {
  user = 'user'
}

export type ApplicationORM = {
  getUnique(model: ApplicationORMModel, id: number): Promise<unknown>;
};

export type ApplicationEnvironment = {
  mode: mode;
  WebFramework: { instance: IWebFramework };
  Storage: { instance: SecondaryStoragePort };
};
