import app from './app';
import config from './config/config';

const server = app.listen(parseInt(config.port), () => {
  console.log('info', `Server is running on Port: ${config.port}`);
});

process.on('SIGTERM', () => {
  server.close((err) => {
    process.exit(err ? 1 : 0);
  });
});
