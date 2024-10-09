const express = require('express');
const connection = require('./db');
const userRouter = require('./routers/user.router');
const scheduleRouter = require('./routers/schedule.router');
const bookingRouter = require('./routers/booking.router');
const loginRouter = require('./routers/login.router');
const registerRouter = require('./routers/register.router'); 
const ReportRouter = require('./routers/report.router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/schedule", scheduleRouter);
app.use("/booking", bookingRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/report', registerRouter);

app.get('/test', async (req, res) => {
  try {
    const [rows, fields] = await connection.query('CALL AddReservation(1, "Economy", 2)');
    console.log("Rows", rows);
    console.log("Fields", fields);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database query failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
