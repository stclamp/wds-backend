import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import compressFilter from './utils/compressFilter.util';
import config from './config/config';
import connection from './db/config';
import postRoutes from './routes/post.routes';

const app: Express = express();

// setup cors
app.use(
  cors({
    origin: [config.cors_origin],
    credentials: true,
  })
);

// reduce the size of the response body
app.use(compression({ filter: compressFilter }));

// parse json
app.use(
  express.urlencoded({
    extended: true,
  })
);
// parse json
app.use(express.json());

// routes
app.use('/posts', postRoutes);

// handling error on server side
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ message: err.message });
});

// connect to DB
connection
  .sync()
  .then(() => console.log('Database synced successful'))
  .catch((err) => console.error(err));

// start server
app.listen(parseInt(config.port), () => {
  console.log('info', `Server is running on Port: ${config.port}`);
});
