import { PrismaClient } from '@prisma/client';

import { ApplicationORM, ApplicationORMModel } from '../../../../../src/core/app/settings';

class PrismaORM implements ApplicationORM {
  private static prisma = new PrismaClient();

  private prismaModelMapping = {
    user: PrismaORM.prisma.user
  };

  public async getUnique(model: ApplicationORMModel, id: number): Promise<unknown> {
    try {
      const data = await this.prismaModelMapping[model].findUnique({
        where: { id }
      });

      return data;
    } catch (error) {
      throw new Error(`Error occurred while trying to get ${model}: ${error.message}`);
    }
  }
}

export { PrismaORM };
