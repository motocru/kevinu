import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API is up and running!');
});

app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
});