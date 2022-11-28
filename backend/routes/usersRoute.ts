import {Router} from 'express'
import {UsersController} from "../controllers/userController";
let usersController = new UsersController();

const router = Router();

router.post('/register', (req, res) => {
    usersController.register(req, res).then(r => r);
});

router.post('/auth', (req, res) => {
    usersController.auth(req, res).then(r => r);
})

export default router;
