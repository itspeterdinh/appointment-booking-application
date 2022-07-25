const catchAsync = require('../utils/catchAsync');
const DateSchedule = require('../models/dateScheduleModel');
const factory = require('./handlerFactory');

exports.createDateSchedule = factory.createOne(DateSchedule);

exports.getAllDate = factory.getAll(DateSchedule);

exports.checkAvailability = catchAsync(async (req, res, next) => {
  const date = await DateSchedule.findById(req.params.id);

  console.log(req.query.index);
  console.log(date.schedule[req.query.index].isBooked);

  if (!date) {
    return next(new AppError('No date found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: date
    }
  });
});
