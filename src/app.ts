import express from 'express';
import helmet from 'helmet';
import routes from './routes/routes';
import { errorHandler } from './middleware/error-handler';

export const app = express();
app.use(helmet());
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);