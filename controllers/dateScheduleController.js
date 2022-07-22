const catchAsync = require('../utils/catchAsync');
const DateSchedule = require('../models/dateScheduleModel');
const factory = require('./handlerFactory');

exports.createDateSchedule = factory.createOne(DateSchedule);
exports.getAllDate = factory.getAll(DateSchedule);
