import {queries, results, tests} from '../modelsDb';

export class ResultsService {

    async passTest(guid: string, answers: [any], userId: number) {
        let test = await tests.findOne({
            where: {
                guid: guid
            }
        })

        let queryList = await queries.findAll({
            where: {
                testId: test?.getDataValue("id")
            }
        })

        let countQueries = queryList.length;
        let result = 0;

        answers.forEach(answer => {
            let query = queryList.find(el => el.getDataValue("id") === answer.questionId)
            let queryOptions = JSON.parse(query?.getDataValue("options"));
            let userAnswer = queryOptions.find((el: any) => el.option == answer.option);
            if (userAnswer && userAnswer.isCorrect) {
                result++;
            }

        })
        let percentage = result != 0 ? result / countQueries * 100: 0;
        return await results.create({
            userId: userId,
            testId: guid,
            result: result + "/" + countQueries,
            percentage: percentage
        })

    }

    async getTestResultsById(testId: number, userId: number) {
        console.log(testId, userId)
        return await results.findOne({
            where: {
                testId: testId,
                userId: userId
            }
        })
    }
}
