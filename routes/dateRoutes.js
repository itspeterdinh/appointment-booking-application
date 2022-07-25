const express = require('express');
const dateController = require('../controllers/dateController');

const router = express.Router();

router
  .route('/')
  .get(dateController.getAllDate)
  .post(dateController.createDateSchedule);

router.route('/check-availability/:id').post(dateController.checkAvailability);

module.exports = router;
