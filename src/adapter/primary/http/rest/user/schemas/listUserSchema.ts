import { usernameAndUUIDRegex } from './utils';

const getUserByIdSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      pattern: usernameAndUUIDRegex
    }
  },
  required: ['id']
};

export { getUserByIdSchema };
