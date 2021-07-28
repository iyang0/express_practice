"use strict"
/** Simple demo Express app. */

const express = require("express");
const app = express();
const stats = require("./stats.js")

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Validates numbers and saves as an array to request object */
function validateNums(req, res, next) {
  //optional chaining
  let values = req.query.nums?.split(",").map(e => Number(e));

  if (!values) {
    throw new BadRequestError("nums are required");
  }

  if (values.some(e => isNaN(e))) {
    throw new BadRequestError("invalid number recieved");
  }

  req.values = values;
  next();
}


/** Calls validateNums middleware before every request */
app.use(validateNums);


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {

  let mean = stats.findMean(req.values);

  return res.json({
    operation: "mean",
    value: mean,
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  let median = stats.findMedian(req.values);

  return res.json({
    operation: "median",
    value: median,
  });
});

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {

  let mode = stats.findMode(req.values);

  return res.json({
    operation: "mode",
    value: mode,
  });
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;