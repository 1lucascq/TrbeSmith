import express from 'express';
import router from './routes';

const routes = router;
const app = express();

app.use(express.json());

app.use(routes);

export default app;
