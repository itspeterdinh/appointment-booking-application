const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const cors = require('cors');

const businessRouter = require('./routes/businessRoutes');
const servicesRouter = require('./routes/serviceRoutes');
const dateRouter = require('./routes/dateRoutes');

const app = express();
app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/businesses', businessRouter);
app.use('/services', servicesRouter);
app.use('/date', dateRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
