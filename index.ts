import * as dotenv from 'dotenv';
import { setApplicationConfig } from './app/index';

dotenv.config();

const run = async (): Promise<void> => {
  const app = await setApplicationConfig();

  try {
    const port: number = parseInt(process.env.PORT || '8080');
    app.listen({ port });
    app.log.info(`Server's running on port: ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

run().catch();
