import {tests, queries} from '../modelsDb';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {DatabaseError} from "sequelize";

export class TestsService {

    async getTestsByUserId(ownerId: string) {
        return await tests.findAll({
            where: {
                ownerId: ownerId
            }
        })
    }

    async getTestByGuid(guid: string) {
        let test = await tests.findOne({
            where: {
                guid: guid
            }
        });

        if (test) {
            let queryList = await queries.findAll({
                where: {
                    testId: test.getDataValue("id")
                }
            })

            return {title: test.getDataValue("title"), queryList: queryList}
        } else throw DatabaseError;
    }

    async createTest(ownerId: number, title: string) {
        console.log(ownerId)
        await tests.create({
            ownerId: ownerId,
            title: title,
            guid: uuidv4()
        });
    }

    async addQuery(ownerId: number, guid: string, title: any, options: any) {
        let test = await tests.findOne({
            where: {
                ownerId: ownerId,
                guid: guid
            }
        });

        console.log(JSON.stringify(options))

        if (test != null) {
            await queries.create({
                query: title,
                options: JSON.stringify(options),
                testId: test.getDataValue("id")
            })
        }
    }
}
