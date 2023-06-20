import { PrimaryHttpPort } from './port';

export type ExampleServiceAdapterOptions = unknown;

export default class Service implements PrimaryHttpPort {
  constructor(private readonly adapter: ExampleServiceAdapterOptions) {}
}
