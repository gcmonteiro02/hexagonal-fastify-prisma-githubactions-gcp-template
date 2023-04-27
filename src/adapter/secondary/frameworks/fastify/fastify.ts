import Fastify, { FastifyInstance } from 'fastify';
import RateLimit from '@fastify/rate-limit';
import Cors from '@fastify/cors';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';

type WebFrameworkType = FastifyInstance;

type WebFrameworkDocumentationSettingsType = {
  prefix: string;
};

const webFrameworkRateLimit = RateLimit;

const webFrameworkCors = Cors;

const webFrameworkDocumentationUi = fastifySwaggerUi;

const webFrameworkDocumentation = fastifySwagger;

const WebFrameworkInstance = Fastify({ logger: true });

export {
  WebFrameworkType,
  webFrameworkRateLimit,
  webFrameworkCors,
  webFrameworkDocumentationUi,
  webFrameworkDocumentation,
  WebFrameworkInstance,
  WebFrameworkDocumentationSettingsType
};
