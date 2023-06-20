import { ConfigureRouterOptions, configRouter } from '../../../../../src/adapter/primary/http/rest/router';
import {
  WebFrameworkInstance,
  webFrameworkDocumentation,
  webFrameworkDocumentationUi,
  WebFrameworkType,
  webFrameworkCors,
  webFrameworkRateLimit
} from './fastify';

export type IWebFramework = {
  setWebFrameworkConfig(configureRouterOptions: ConfigureRouterOptions): Promise<WebFrameworkType>;
};

class WebFramework implements IWebFramework {
  private app: WebFrameworkType = WebFrameworkInstance;

  setWebFrameworkConfig = async (configureRouterOptions: ConfigureRouterOptions) => {
    // Swagger documentation config
    await this.app.register(webFrameworkDocumentation);

    await this.app.register(webFrameworkDocumentationUi, {
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      staticCSP: true,
      transformStaticCSP: header => header,
      transformSpecification: swaggerObject => {
        return swaggerObject;
      },
      transformSpecificationClone: true
    });

    // Configure all routes in the application
    configRouter(this.app, configureRouterOptions);

    // Cors
    await this.app.register(webFrameworkCors, {
      origin: '*',
      methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH', 'OPTIONS']
    });

    // Set rate limit to avoid many requests from same ip
    await this.app.register(webFrameworkRateLimit, {
      max: 10,
      timeWindow: '1 minute'
    });

    await this.app.ready();

    return this.app;
  };
}

export { WebFramework, WebFrameworkType };
