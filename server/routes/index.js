const path = require('path');

const configureRoutes = (app) => {
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/users', require('./api/users'));
  app.use('/api/mails', require('./api/mails'));
  app.use('/api/chips', require('./api/chips'));
  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
};

module.exports = configureRoutes;
