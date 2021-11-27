// Express serverio sukurimas
const express = require('express')
const app = express()
const port = 3003

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Nodedemon atnaujina serveri
// SQL tiltas tarp serverio ir mysql
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "kolt",
  password: "kolt",
  database: "kolt"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Cors kad teisingus headerius issiustu
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

// Routeris - nusakomas kelias kas turi ivykti kai serveris kreipsis ir ka narsykle atsakys
app.get('/labas/:id', (req, res) => {
  res.send(`labas tau ${req.params.id} `)
})

// Testinis routas
app.get('/test', (req, res) => {
  res.send(JSON.stringify({ test: 'OK' }))
})
//   -------------------------------------------------------------------------------STARTAS-----------------------------------------

// Read node
// kreipiames į DB gauti scooterius ir išsiųsti į reaktą
// kreipiames i scooterius, is DB pasirasome SELECT, ta selecta atiduodame duomenu bazei, su conection uzklausiame(query) serveri, gauname rezultatus ir issiunciame atgal
app.get('/scooters', (req, res) => {
  const sql = `
    SELECT *
    FROM scooters
    `;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})

//Delete node
app.delete('/scooters/:id', (req, res) => {
  const sql = `
        DELETE FROM scooters
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
    console.log("Scooter was deleted");
  })
})

// Edit Node
app.put('/scooters/:id', (req, res) => {
  const sql = `
      UPDATE scooters
      SET registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometers = ?, one_day_ride = ?
      WHERE id = ?
  `;
  con.query(sql, [
    req.body.registration_code,
    req.body.is_busy,
    req.body.last_use_time,
    parseFloat(req.body.total_ride_kilometers) + parseFloat(req.body.one_day_ride),
    req.body.one_day_ride,
    req.params.id
  ], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
    console.log("Scooter was edited");
  })
})

// Create node
app.post('/scooters', (req, res) => {
  const sql = `
      INSERT INTO scooters
      (registration_code, is_busy, last_use_time, total_ride_kilometers, one_day_ride)
      VALUES (?, ?, ?, ?, ?)
  `;
  con.query(sql, [
    req.body.registration_code,
    req.body.is_busy,
    req.body.last_use_time,
    parseFloat(req.body.total_ride_kilometers) + parseFloat(req.body.one_day_ride),
    req.body.one_day_ride,
  ], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
    console.log("Scooter was created");
  })
})

// ------------------------------------------------------
// Statistic
app.get('/stats', (req, res) => {
  const sql = `
SELECT COUNT(id) as scootersCount, SUM(total_ride_kilometers+one_day_ride) as scootersKm, AVG(total_ride_kilometers) as scootersAverage
FROM scooters
`;
  // console.log(req.query.s);
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})

// Group statistic
app.get('/group-stats', (req, res) => {
  const sql = `
SELECT COUNT(id) as scootersCount, registration_code
FROM scooters
GROUP BY registration_code
ORDER BY total_ride_kilometers desc
`;
  // console.log(req.query.s);
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})
// -------------------------------------------------------------------------------------------------
// Finds different DISTINCT registration_code
app.get('/scooters-code', (req, res) => {
  const sql = `
  SELECT DISTINCT registration_code
  FROM scooters
  `;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})
// ----------------------------------------------------------------------------------------------------------
// Filter by registration code
app.get('/scooters-filter/:t', (req, res) => {
  const sql = `
  SELECT *
  FROM scooters
  WHERE registration_code = ?
  `;
  con.query(sql, [req.params.t], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})
// ---------------------------------------------------------------------------
// Search by registration_code
app.get('/scooters-search', (req, res) => {
  const sql = `
  SELECT *
  FROM scooters
  WHERE registration_code like ?
  `;
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})