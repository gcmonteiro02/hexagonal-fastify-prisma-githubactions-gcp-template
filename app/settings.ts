import { IWebFramework } from 'src/adapter/secondary/frameworks/fastify';
import { WebFramework } from '../src/adapter/secondary/frameworks/fastify/index';

export enum mode {
  development = 'development',
  production = 'production'
}

export type ApplicationEnvironment = {
  mode: mode;
  WebFramework: { instance: IWebFramework };
};

const currentMode = process.env.MODE ?? mode.development;

const settings: ApplicationEnvironment = {
  mode: currentMode as mode,
  WebFramework: { instance: new WebFramework() }
};

export default settings;
