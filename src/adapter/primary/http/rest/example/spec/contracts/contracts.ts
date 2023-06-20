import getExampleOk from './responses/200/get-example.json';

const listExampleSchema = {
  description: 'List example.',
  tags: ['example'],
  summary: 'List example',
  response: {
    200: getExampleOk
  }
};
export { listExampleSchema };
