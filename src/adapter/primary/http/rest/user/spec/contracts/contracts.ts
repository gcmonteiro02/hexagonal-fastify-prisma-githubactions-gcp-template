import { getUserByIdSchema } from '../../schemas/listUserSchema';
import getExampleOk from './responses/200/get-example.json';

const listUserSpec = {
  description: 'List user.',
  tags: ['example'],
  summary: 'List example',
  response: {
    200: getExampleOk
  },
  params: getUserByIdSchema
};
export { listUserSpec };
