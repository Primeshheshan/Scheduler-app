const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 8080;
const mongoConnect = require('./src/utils/database').mongoConnect;
const userRoutes = require('./src/routes/user');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', userRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

mongoConnect(() => {
  app.listen(port);
  console.log(`App listening on ${port}`);
});
