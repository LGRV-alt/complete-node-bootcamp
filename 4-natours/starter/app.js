const morgan = require('morgan');
const express = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//----------------MIDDLEWARE------------------------
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// -------- To start server for postman testing use nodemon app.js -----------

// ---------------ROUTE HANDLERS ----------------------
// Now imported

// ------------ROUTES -----------------------

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
