import express from 'express';
import routes from './routes/index.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.use('/api', routes);

export default app;