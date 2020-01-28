import 'dotenv/config';
import express from 'express';
import { join } from 'path';

import router from './routes';
import applyMiddlewares from './middlewares';
import setupDatabase from './config/database';

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

setupDatabase();
applyMiddlewares(app);

app.use('/api/v1', router);

const distPath = join(__dirname, '../../dist/client');
app.use(express.static(distPath));
app.get('*', (_, res) => res.sendFile(join(distPath, 'index.html')));

app.listen({ port: SERVER_PORT }, () => {
  console.log(`app is running on port ${SERVER_PORT}`);
});
