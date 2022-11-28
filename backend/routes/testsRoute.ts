import {Router} from 'express'
import {TestsController} from "../controllers/testsController";
let testsController = new TestsController();

const router = Router();

router.get('/guid/:guid', (req, res) => {
    testsController.getTestByGuid(req, res).then(r => r);
});

router.get('/:ownerId', (req, res) => {
    testsController.getTestsByOwnerId(req, res).then(r => r);
})

router.post('/', (req, res) => {
    testsController.createTest(req, res).then(r => r);
})

router.post('/query', (req, res) => {
    testsController.addQuery(req, res).then(r => r);
})

export default router;
