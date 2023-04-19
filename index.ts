import 'reflect-metadata';
import * as dotenv from "dotenv";

import { ApplicationEnvironment, configureApplication } from './app';

dotenv.config();

const run = async (): Promise<void> => {
  const env: ApplicationEnvironment = {
    postgre: { url: (process.env.DATABASE_URL as string) },
    mode: 'development',
    swagger: {
      prefix: (process.env.SWAGGER_PREFIX as string || 'documentation')
    }
  };

  const app = await configureApplication(env);

  try {
    const port: number = parseInt(process.env.PORT || '8080');
    app.listen({ port });
    console.log(`Server's running on port: ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

run().catch(console.error);
