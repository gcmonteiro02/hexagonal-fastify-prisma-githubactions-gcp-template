import settings, { ApplicationEnvironment } from './settings';
import { ConfigureRouterOptions } from '../src/adapter/primary/http/rest/router';
import { WebFrameworkType } from '../src/adapter/secondary/frameworks/fastify/index';

import ExampleService from '../src/domain/example/service';

export const setApplicationConfig = async (): Promise<WebFrameworkType> => {
  const {
    WebFramework: { instance: WebFrameworkInstance }
  } = settings as ApplicationEnvironment;

  const exampleService = new ExampleService({});

  const configureRouterOptions: ConfigureRouterOptions = {
    ExampleService: exampleService
  };

  return WebFrameworkInstance.setWebFrameworkConfig(configureRouterOptions);
};
