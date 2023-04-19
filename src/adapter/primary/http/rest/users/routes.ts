import HttpStatusCodes from 'http-status-codes';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { PrimaryHttpPort } from '../../../../../domain/user/port';
import { createUserSchema, listUserSchema } from './spec/schemas/schemas';
import { UserCreate } from "../../../../../domain/user/user";

const listUserOpts = (service: PrimaryHttpPort) => ({
  schema: listUserSchema,
  handler: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const establishments = await service.listUser()
      reply.send(establishments).status(HttpStatusCodes.OK)
    } catch (error) {
      reply.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Error wrong test',
        data: {
          error: { message: (error as Error).message }
        }
      });
    }

  },
})

const createUserOpts = (service: PrimaryHttpPort) => ({
  schema: createUserSchema,
  handler: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = request.body
      const establishments = await service.createUser((body as UserCreate))
      reply.send(establishments).status(HttpStatusCodes.CREATED)
    } catch (error) {
      reply.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Undefined Error',
        data: {
          error: { message: (error as Error).message }
        }
      });
    }

  },
})

const configureEstablishmentsRouter = (service: PrimaryHttpPort, app: FastifyInstance) => {
  app.get('/user', listUserOpts(service))
  app.post('/user', createUserOpts(service))
}

export { configureEstablishmentsRouter }