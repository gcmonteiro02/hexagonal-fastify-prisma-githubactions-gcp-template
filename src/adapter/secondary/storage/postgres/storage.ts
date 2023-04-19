import { PrismaClient } from '@prisma/client';

import { SecondaryStoragePort as SecondaryUserStoragePort } from '../../../../domain/user/port';
import { UserCreate, UserResponse } from '../../../../domain/user/user';

class PostgreStorage
    implements
    SecondaryUserStoragePort {
    private readonly db: PrismaClient;

    constructor() {
        this.db = new PrismaClient({
            log: [
                'error'
            ]
        });
    }

    async createUser(data: UserCreate): Promise<boolean> {
        console.log("createUser ~~~> data:", data)
        return false
    }

    async listUser(): Promise<UserResponse[]> {

        const result = await this.db.user.findMany({})

        const listOfEstablishments: UserResponse[] = result.map(({ id, name, ...timestampInfo }) => ({
            identifier: id,
            name: name.toUpperCase(),
            createUpdateDateTimeInfo: timestampInfo
        }))
        return listOfEstablishments
    }

}

export default PostgreStorage;
