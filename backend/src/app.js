import express from 'express';
import routes from './routes/index.routes.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.use('/api', routes);

export default app;