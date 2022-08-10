const catchAsync = require('../utils/catchAsync');
const DateS = require('../models/dateModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createDateSchedule = factory.createOne(DateS);

// exports.getAllDate = factory.getAll(DateS);

exports.checkAvailability = catchAsync(async (req, res, next) => {
  const date = await DateS.findById(req.params.id);

  if (!date) {
    return next(new AppError('No date found with that ID', 404));
  }

  const isAvailable = date.checkAvailability(req.query.index, req.body.skip);
  await date.save();

  res.status(200).json({
    status: 'success',
    data: {
      isAvailable: isAvailable
    }
  });
});

exports.releaseHold = catchAsync(async (req, res, next) => {
  const date = await DateS.findById(req.params.id);

  if (!date) {
    return next(new AppError('No date found with that ID', 404));
  }

  date.releaseHold(req.query.index);
  await date.save();

  res.status(200).json({
    status: 'success',
    data: {
      isDone: true
    }
  });
});

exports.getAllDate = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const features = new APIFeatures(DateS.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;

  const today = new Date();

  const firstAvailability = await doc.find(
    element =>
      new Date(element.year, element.month, element.date) >= today &&
      !element.isFull
  );

  res.status(200).json({
    status: 'success',
    result: doc.length,
    data: {
      firstAvaiDate: firstAvailability,
      data: doc
    }
  });
});

exports.createDateDocuments = catchAsync(async (req, res, next) => {
  const year = 2022;
  const month = 9;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let i = 1;
  while (i <= daysInMonth) {
    const date = {
      year: year,
      month: month,
      date: i,
      isFull: false,
      schedule: [
        {
          time: 9,
          isBooked: false,
          phone: '',
          email: '',
          lastHold: new Date('January 1, 2000, 12:00:00')
        },
        {
          time: 10,
          isBooked: false,
          phone: '',
          email: '',
          lastHold: new Date('January 1, 2000, 12:00:00')
        },
        {
          time: 11,
          isBooked: false,
          phone: '',
          email: '',
          lastHold: new Date('January 1, 2000, 12:00:00')
        },
        {
          time: 12,
          isBooked: false,
          phone: '',
          email: '',
          lastHold: new Date('January 1, 2000, 12:00:00')
        },
        {
          time: 13,
          isBooked: false,
          phone: '',
          email: '',
          lastHold: new Date('January 1, 2000, 12:00:00')
        }
      ]
    };
    await DateS.create(date);
    i += 1;
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: daysInMonth
    }
  });
});
