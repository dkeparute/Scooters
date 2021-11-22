// Express serverio instaliavimas
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

// Routeris - nusakomas kelias kas turi ivykti kai narsykle kreipsis ir ka serveris atsakys

app.get('/labas/:id', (req, res) => {
  res.send(`labas tau ${req.params.id} `)
})
app.get('/test', (req, res) => {
  res.send(JSON.stringify({ test: 'OK' }))
})
//   -------------------------------------------------------------------------------

// Read node
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
  })
})

// Edit Node
app.put('/scooters/:id', (req, res) => {
  const sql = `
      UPDATE scooters
      SET registration_code = ?, is_busy = ?, last_use_time = ?, total_ride_kilometres = ?, one_day_ride = ?
      WHERE id = ?
  `;
  con.query(sql, [
    req.body.registration_code,
    req.body.is_busy,
    req.body.last_use_time,
    parseFloat(req.body.total_ride_kilometres) + parseFloat(req.body.one_day_ride),
    req.body.one_day_ride,
    req.params.id
  ], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})

// Create node
app.post('/scooters', (req, res) => {
  const sql = `
      INSERT INTO scooters
      (registration_code, is_busy, last_use_time, total_ride_kilometres, one_day_ride)
      VALUES (?, ?, ?, ?, ?)
  `;
  con.query(sql, [
    req.body.registration_code,
    req.body.is_busy,
    req.body.last_use_time,
    req.body.total_ride_kilometres,
    req.body.one_day_ride,
  ], (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})
