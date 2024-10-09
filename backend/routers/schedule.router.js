const { Router } = require("express");
const connection = require("../db");

const router = Router();

router.get("/full", async (req, res) => {
  try {
    const [rows] = await connection.query("CALL GetFutureSchedule()");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to retrieve schedules");
  }
});

// API: Get future schedule by route using a stored procedure
router.get("/flight/future", async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).send("Missing required query parameters: from and to");
  }

  try {
    const [rows] = await connection.query(
      "CALL GetFutureScheduleByRoute(?, ?)",
      [from, to]
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send("No flights found for the given route");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while retrieving the schedule");
  }
});

// API: Get future schedule by route and date range using a stored procedure
router.get('/flight/daterange', async (req, res) => {
  const start = req.query.start?.trim();
  const end = req.query.end?.trim();
  const from = req.query.from?.trim();
  const to = req.query.to?.trim();

  if (!start || !end || !from || !to) {
    return res.status(400).send('Missing required query parameters: start, end, from, and to');
  }

  try {
    const query = `CALL GetFutureScheduleByRouteAndDateRange('${start}', '${end}', '${from}', '${to}')`;
    console.log('Executing SQL query:', query);
  
    const [rows] = await connection.query(query);

    if (rows.length > 0 && rows[0].length > 0) {
      res.json(rows);
    } else {
      res.status(404).send('No flights found for the given route and date range');
    }
  } catch (err) {
    console.error('Error occurred during procedure execution:', err);
    res.status(500).send('An error occurred while retrieving the schedule');
  }
});

router.get('/flight/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [rows] = await connection.query('SELECT * FROM schedule WHERE schedule_id = ?', [id]);

    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Schedule not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve schedule');
  }
});

// Export the router
module.exports = router;
