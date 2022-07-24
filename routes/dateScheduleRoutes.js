const express = require('express');
const dateScheduleController = require('../controllers/dateScheduleController');

const router = express.Router();

router
  .route('/')
  .get(dateScheduleController.getAllDate)
  .post(dateScheduleController.createDateSchedule);

// router
//   .route('/check-availability/:id')
//   .post(dateScheduleController.checkAvailability);

module.exports = router;
