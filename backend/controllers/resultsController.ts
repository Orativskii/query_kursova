import {ResultsService} from "../models/resultsService";
let resultsService = new ResultsService();

export class ResultsController {

    async passTest(req: any, res: any) {
        try {
            res.status(200)
            res.json(await resultsService.passTest(req.body.guid, req.body.answers, req.body.userId));
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async getTestResultsById(req: any, res: any) {
        try {
            res.status(200);
            res.json(await resultsService.getTestResultsById(req.params.testId, req.params.userId));
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }
}
