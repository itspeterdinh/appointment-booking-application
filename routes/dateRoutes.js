const express = require('express');
const dateController = require('../controllers/dateController');

const router = express.Router();

router
  .route('/')
  .get(dateController.getAllDate)
  .post(dateController.createDateSchedule);

router.route('/check-availability/:id').patch(dateController.checkAvailability);

router.route('/cancel-booking/:id').patch(dateController.cancelBooking);

router.route('/create-dates').post(dateController.createDateDocuments);

module.exports = router;
