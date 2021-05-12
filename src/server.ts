import app from './app';
import color from 'colors/safe';

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${color.yellow(
      String(process.env.NODE_ENV).toUpperCase()
    )} mode on port ${PORT}`
  );
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: NodeJS.ErrnoException) => {
  console.log(`Error: ${color.red(err.message || 'no message provided')}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
