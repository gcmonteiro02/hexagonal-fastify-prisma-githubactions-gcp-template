import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { listExampleSchema } from './spec/contracts/contracts';

const listExampleOpts = () => ({
  schema: listExampleSchema,
  handler: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      reply.send({}).status(200);
    } catch (error) {
      reply.status(500).send({
        message: 'Error wrong test',
        data: {
          error: { message: (error as Error).message }
        }
      });
    }
  }
});

const configureExampleRouter = (app: FastifyInstance) => {
  const entity = '/example';
  const listExample = listExampleOpts();
  app.get(entity, listExample);
};

export { configureExampleRouter };
