import {Router} from 'express'
import {ResultsController} from "../controllers/resultsController";
let resultsController = new ResultsController();

const router = Router();

router.post('/', (req, res) => {
    resultsController.passTest(req, res).then(r => r);
});

router.get('/:userId/:testId', (req, res) => {
    resultsController.getTestResultsById(req, res).then(r => r);
})

export default router;
