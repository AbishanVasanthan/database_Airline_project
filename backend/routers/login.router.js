const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db'); // Adjust the path according to your structure

// POST route for login
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).send({ success: false, message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(400).send({ success: false, message: 'User not found' });
        }

        const user = results[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ success: false, message: 'Invalid password' });
        }

        // On success
        return res.status(200).send({ success: true, message: 'Login successful' });
    });
});

module.exports = router;
