import {users} from '../modelsDb';

export class UserService {

    static async register(username: string, password: string) {
        return await users.create({
            username,
            password
        });
    }

    static async auth(username: string, password: string) {
        return await users.findOne({
            where: {
                username,
                password
            }
        });
    }
}
