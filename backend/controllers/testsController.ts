import {TestsService} from "../models/testsService";
let testService = new TestsService();

export class TestsController {

    async getTestByGuid(req: any, res: any) {
        try {
            res.status(200)
            res.json(await testService.getTestByGuid(req.params.guid));
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async getTestsByOwnerId(req: any, res: any) {
        try {
            res.status(200);
            res.json(await testService.getTestsByUserId(req.params.ownerId));
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async createTest(req: any, res: any) {
        try {
            await testService.createTest(req.body.ownerId, req.body.title)
            res.status(200);
            res.end();
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async addQuery(req: any, res: any) {
        try {
            console.log(req.body)
            await testService.addQuery(req.body.ownerId, req.body.guid, req.body.title, req.body.options)
            res.status(200);
            res.end();
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }
}
