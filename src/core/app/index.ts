import { ApplicationEnvironment, mode } from './settings';
import UserService from '../domain/user/service';

import { ConfigureRouterOptions } from '../../adapter/primary/http/rest/router';
import { WebFramework, WebFrameworkType } from '../../adapter/secondary/frameworks/fastify/index';
import { ApplicationStorage } from '../../adapter/secondary/storage/example';
import { ApplicationORMAdapter } from '../../adapter/secondary/libs/prisma';

export const setApplicationConfig = async (): Promise<WebFrameworkType> => {
  const currentMode = process.env.MODE ?? mode.development;

  const applicationORM = new ApplicationORMAdapter();

  const {
    WebFramework: { instance: WebFrameworkInstance },
    Storage
  }: ApplicationEnvironment = {
    mode: currentMode as mode,
    WebFramework: {
      instance: new WebFramework()
    },
    Storage: {
      instance: new ApplicationStorage({ ORM: applicationORM })
    }
  };

  const userService = new UserService({ storage: Storage.instance });

  const configureRouterOptions: ConfigureRouterOptions = {
    UserService: userService
  };

  return WebFrameworkInstance.setWebFrameworkConfig(configureRouterOptions);
};
