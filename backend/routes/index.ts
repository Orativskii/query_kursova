import {Router} from 'express'
import UsersRoute from "./usersRoute";
import TestsRoute from "./testsRoute";
import ResultsRoute from "./resultsRoute";

const router = Router();

router.use('/users', UsersRoute);
router.use('/tests', TestsRoute);
router.use('/results', ResultsRoute);


export default router
