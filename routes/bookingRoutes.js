const express = require("express");

const authController = require("../controllers/authController");
const bookingsController = require("../controllers/bookingController");

const router = express.Router();

router.get(
  "/checkout-session/:tourId",
  authController.protect,
  bookingsController.getCheckoutSession
);
module.exports = router;