import express, { Application, Request, Response } from 'express';
import { router as wordgameRoutes } from './wordgame/wordgame';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with frontend's actual origin (e.g., https://your-frontend-domain.com)
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Accept'] // Allowed headers
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API is up and running!');
});

app.use('/wordgame', wordgameRoutes);

app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
});