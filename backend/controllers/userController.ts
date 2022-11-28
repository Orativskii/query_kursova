import {UserService} from "../models/userService";

export class UsersController {

    async register(req: any, res: any) {
        try {
            await UserService.register(req.body.username, req.body.password);
            res.status(200);
            res.end();
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async auth(req: any, res: any) {
        try {
            let user = await UserService.auth(req.body.username, req.body.password);
            if (user) {
                res.status(200);
                res.json(user);
            } else {
                res.status(401);
                res.end("Неправильний логін чи пароль");
            }

        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }
}
