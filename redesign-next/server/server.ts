import express, { Application, Request, Response } from 'express';
import { router as wordgameRoutes } from './wordgame';

const app: Application = express();
const PORT = process.env.PORT || 3001;

const router = express.Router();

app.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send('API is up and running!');
});

router.use('/wordgame', wordgameRoutes);

app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
});