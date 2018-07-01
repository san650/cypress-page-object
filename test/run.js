const cypress = require('cypress');
const app = require('./dummy/app');

const server = app.listen(3001, () => {
  console.info('Running tests on port 3001...');

  return cypress.run().then((results) => {
    return server.close(() => {
      // We need to end the process with an error code if there are failures.
      // This is used by the CI server to mark the build as failed.
      if (results.failures) {
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  });
});
