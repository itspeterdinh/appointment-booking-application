const catchAsync = require('../utils/catchAsync');
const Service = require('../models/serviceModel');
const factory = require('./handlerFactory');

exports.getAllService = factory.getAll(Service);
