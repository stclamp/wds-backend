import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import compressFilter from './utils/compressFilter.util';
import config from './config/config';
import connection from './db/config';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';
import passportMiddleware from './middleware/passport';

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

app.use(cookieParser());
app.use(passport.initialize());

passportMiddleware(passport);

// routes
app.use('/posts', postRoutes);
app.use('/', userRoutes);

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
