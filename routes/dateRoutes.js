const express = require('express');
const dateController = require('../controllers/dateController');

const router = express.Router();

router
  .route('/')
  .get(dateController.getAllDate)
  .post(dateController.createDateSchedule);

router.route('/check-availability/:id').patch(dateController.checkAvailability);

router.route('/release-hold/:id').patch(dateController.releaseHold);

router.route('/create-dates').post(dateController.createDateDocuments);

module.exports = router;
