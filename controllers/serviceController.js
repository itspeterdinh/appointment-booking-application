const catchAsync = require('../utils/catchAsync');
const Service = require('../models/businessModel');
const factory = require('./handlerFactory');

exports.getAllService = factory.getAll(Service);
