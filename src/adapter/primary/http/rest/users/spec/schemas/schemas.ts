import { getUsers200 } from '../responses/200/get-users.json'
import { createUsers201 } from '../responses/201/create-users.json'

import { createUsersBodySchema } from '../body/create-request-register-user.json'

const createUserSchema = {
    description: 'Create user in database',
    tags: ['users'],
    body: createUsersBodySchema,
    response: {
        201: createUsers201
    }
}

const listUserSchema = {
    description: 'List all users',
    tags: ['users'],
    summary: 'List all users',
    response: {
        200: getUsers200
    }
}

export {
    createUserSchema,
    listUserSchema
}