const catchAsync = require('../utils/catchAsync');
const Business = require('../models/businessModel');

exports.getBusiness = catchAsync(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      business
    }
  });
});

exports.updateBusiness = catchAsync(async (req, res, next) => {
  const business = await Business.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      business
    }
  });
});
