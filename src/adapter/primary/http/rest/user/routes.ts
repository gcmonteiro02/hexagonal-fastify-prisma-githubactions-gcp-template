import { listUserSpec } from './spec/contracts/contracts';

import {
  WebFrameworkType,
  WebFrameworkReply,
  WebFrameworkRequest
} from '../../../../../../src/adapter/secondary/frameworks/fastify';
import { PrimaryHttpPort as UserPrimaryHttpPort } from '../../../../../../src/core/domain/user/port';

const listExampleOpts = (userService: UserPrimaryHttpPort) => ({
  schema: listUserSpec,
  handler: async (request: WebFrameworkRequest, reply: WebFrameworkReply) => {
    try {
      const params = request.params as { id: string };
      const user = await userService.get(Number(params.id));

      reply.send(user).status(200);
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

const configureExampleRouter = (app: WebFrameworkType, userService: UserPrimaryHttpPort) => {
  const entity = '/users';
  const listExample = listExampleOpts(userService);
  app.get(entity, listExample);
};

export { configureExampleRouter };
