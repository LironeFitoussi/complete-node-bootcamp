/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const AppError = require('./utils/appError');

//! Routes Imports --------------------------------
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const globalErrorHandler = require('./controllers/errorController');
const app = express();

// 1) Global Middlewares

//! Security HTTP Headers
app.use(helmet());

//! Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

//! Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//! Body Parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//! Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//! Data sanitization against XSS attacks
app.use(xss());

//! Prevent http param pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

//! Serve static files
app.use(express.static(`${__dirname}/public`));

//! Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
