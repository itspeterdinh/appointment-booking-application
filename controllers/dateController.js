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

  const isBooked = date.checkAvailability(req.query.index);
  await date.save();

  res.status(200).json({
    status: 'success',
    data: {
      isBooked: isBooked
    }
  });
});

exports.cancelBooking = catchAsync(async (req, res, next) => {
  const date = await DateS.findById(req.params.id);

  if (!date) {
    return next(new AppError('No date found with that ID', 404));
  }

  date.cancelBooking(req.query.index);
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

  const firstAvailability = doc.find(
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
  const month = 8;
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
          email: ''
        },
        {
          time: 10,
          isBooked: false,
          phone: '',
          email: ''
        },
        {
          time: 11,
          isBooked: false,
          phone: '',
          email: ''
        },
        {
          time: 12,
          isBooked: false,
          phone: '',
          email: ''
        },
        {
          time: 13,
          isBooked: false,
          phone: '',
          email: ''
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
