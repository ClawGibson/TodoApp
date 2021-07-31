require('dotenv/config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoute = require('./routes/users.route');
const taskRoute = require('./routes/tasks.route');

const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const { API_URL, PORT, MONGODB, DBNAME } = process.env;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

// routes
app.use(`${API_URL}/user`, userRoute);
app.use(`${API_URL}/task`, taskRoute);

mongoose
  .connect(MONGODB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DBNAME,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Succefully connected to database ${DBNAME}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT || 4000, () => {
  console.log(`Server running at ${process.env.port || 4000}`);
});
