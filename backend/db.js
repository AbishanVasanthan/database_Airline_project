//const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abiniruz@123',
    database: 'airline_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


// Load environment variables from .env file
dotenv.config();

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dateStrings: true,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// Export the connection pool
//module.exports = connection;
module.exports = db;