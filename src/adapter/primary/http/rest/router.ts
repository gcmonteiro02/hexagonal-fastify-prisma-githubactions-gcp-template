import { FastifyInstance } from 'fastify';
import { PrimaryHttpPort as UserPrimaryPort } from '../../../../domain/example/port';
import { configureExampleRouter } from './example';

type ConfigureRouterOptions = {
  ExampleService: UserPrimaryPort;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function configRouter(app: FastifyInstance, _ConfigureRouterOptionsSet: ConfigureRouterOptions) {
  configureExampleRouter(app);

  return app;
}

export { configRouter, ConfigureRouterOptions };
