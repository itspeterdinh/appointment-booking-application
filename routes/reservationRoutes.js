const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.route('/:id').get(reservationController.getReservation);

router.route('/book-appointment').post(reservationController.createReservation);

module.exports = router;
