const catchAsync = require('../utils/catchAsync');
const Reservation = require('../models/reservationModel');
const Slot = require('../models/slotModel');
const factory = require('./handlerFactory');

exports.getReservation = factory.getOne(Reservation);

exports.createReservation = catchAsync(async (req, res, next) => {
  const reservation = await Reservation.create(req.body);

  await Slot.findByIdAndUpdate(req.body.slot, {
    reservation: reservation,
    isBooked: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      id: reservation._id
    }
  });
});
