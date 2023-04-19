import Fastify, { FastifyInstance } from "fastify";
import RateLimit from '@fastify/rate-limit'
import Cors from '@fastify/cors'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import fastifySwagger from '@fastify/swagger'

import PostgreStorage from "../src/adapter/secondary/storage/postgres/storage";
import UserService from '../src/domain/user/service';

import { configRouter, ConfigureRouterOptions } from '../src/adapter/primary/http/rest/router'

export interface PostgreEnvironment {
  url: string;
}

export interface SwaggerEnvironment {
  prefix: string;
}

export interface ApplicationEnvironment {
  mode: string;
  postgre: PostgreEnvironment;
  swagger: SwaggerEnvironment;
}

export const configureApplication = async (env: ApplicationEnvironment): Promise<FastifyInstance> => {
  const storage: PostgreStorage = new PostgreStorage();
  const userService = new UserService({ storage });

  const app: FastifyInstance = Fastify({ logger: true });

  const configureRouterOptionsSetted: ConfigureRouterOptions = { userService }

  await app.register(fastifySwagger)

  await app.register(fastifySwaggerUi, {
    routePrefix: env.swagger.prefix,
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (_request, _reply, next) { next() },
      preHandler: function (_request, _reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => { return swaggerObject },
    transformSpecificationClone: true
  })

  configRouter(app, configureRouterOptionsSetted)

  app.register(Cors, {
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH", "OPTIONS"]
  });

  app.register(RateLimit, {
    max: 35,
    timeWindow: '1 minute'
  })

  // app.register(fastifyStatic, {
  //   root: path.join(__dirname, '../src/spec'),
  //   prefix: '/spec'
  // })

  await app.ready()

  return app;
};