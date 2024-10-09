// backend/routers/register.router.js
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db'); // Make sure the path is correct
const router = express.Router();

// POST route for registration
router.post('/', async (req, res) => {
    const { email, password, first_name, last_name, gender, dob } = req.body;

    // Check if the user already exists
    const checkUserQuery = 'SELECT * FROM user WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Server error' });
        }
        if (results.length > 0) {
            return res.status(400).send({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const insertUserQuery = `
            INSERT INTO user (email, password, first_name, last_name, gender, dob)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(insertUserQuery, [email, hashedPassword, first_name, last_name, gender, dob], (err, result) => {
            if (err) {
                return res.status(500).send({ success: false, message: 'Error saving user' });
            }
            return res.status(201).send({ success: true, message: 'User registered successfully' });
        });
    });
});

module.exports = router;
