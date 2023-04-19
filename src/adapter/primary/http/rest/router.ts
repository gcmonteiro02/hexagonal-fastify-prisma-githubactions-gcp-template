import { FastifyInstance } from 'fastify';
import { PrimaryHttpPort as UserPrimaryPort } from '../../../../domain/user/port';

import { configureEstablishmentsRouter } from './users';

type ConfigureRouterOptions = {
  userService: UserPrimaryPort;
}

function configRouter(app: FastifyInstance, ConfigureRouterOptionsSet: ConfigureRouterOptions) {
  const { userService }: ConfigureRouterOptions = ConfigureRouterOptionsSet

  configureEstablishmentsRouter(userService, app)

  return app
}

export { configRouter, ConfigureRouterOptions }