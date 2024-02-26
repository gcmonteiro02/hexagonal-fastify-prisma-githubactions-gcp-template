import { configureExampleRouter } from './user';

import { PrimaryHttpPort as UserPrimaryPort } from '../../../../core/domain/user/port';
import { WebFrameworkType } from '../../../../adapter/secondary/frameworks/fastify';

type ConfigureRouterOptions = {
  UserService: UserPrimaryPort;
};

const configRouter = (app: WebFrameworkType, ConfigureRouterOptionsSet: ConfigureRouterOptions) => {
  configureExampleRouter(app, ConfigureRouterOptionsSet.UserService);

  return app;
};

export { configRouter, ConfigureRouterOptions };
