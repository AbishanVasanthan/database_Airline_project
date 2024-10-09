const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db'); // Make sure the path is correct
const router = express.Router();

// API to get reports
router.post('/', (req, res) => {
  const { reportType, destinationCode, startDate, endDate, origin, destination } = req.body;
  let query = '';

  // Build query based on report type
  if (reportType === 'passengers_above_18_years') {
    query = `SELECT * FROM user WHERE TIMESTAMPDIFF(YEAR, dob, CURDATE()) > 18`;
  } else if (reportType === 'passengers_by_destination') {
    query = `SELECT * FROM user u JOIN booking b ON u.user_id = b.user_id 
             WHERE b.destination_code = ? AND b.date BETWEEN ? AND ?`;
  } else if (reportType === 'bookings_by_type') {
    query = `SELECT tier, COUNT(*) as total_bookings FROM user u JOIN booking b ON u.user_id = b.user_id 
             WHERE b.date BETWEEN ? AND ? GROUP BY tier`;
  } else if (reportType === 'flights_by_route') {
    query = `SELECT * FROM flight WHERE origin_code = ? AND destination_code = ?`;
  } else if (reportType === 'revenue_by_aircraft') {
    query = `SELECT a.model, SUM(b.price) as total_revenue FROM aircraft a 
             JOIN flight f ON a.aircraft_id = f.aircraft_id 
             JOIN booking b ON f.flight_id = b.flight_id GROUP BY a.model`;
  }

  // Execute query
  db.query(query, [destinationCode, startDate, endDate, origin, destination], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send({ error: 'Error fetching report' });
    } else {
      res.send({ data: result });
    }
  });
});

module.exports = router;
