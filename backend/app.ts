import express from 'express';
import router from './routes'
import cors from 'cors'

const app = express();

async function parser(req: any, res: any, next: () => void) {
    await req.on('data', (data: any) => {
        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(data);
        }
    });
    next();
}

app.use(cors())
app.use(parser)
app.use(router)

export default app;
