const catchAsync = require('../utils/catchAsync');
const DateS = require('../models/dateModel');
const factory = require('./handlerFactory');

exports.createDateSchedule = factory.createOne(DateS);

exports.getAllDate = factory.getAll(DateS);

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
      data: isBooked
    }
  });
});
