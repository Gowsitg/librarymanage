const express = require("express");
const cors = require("cors"); // Import cors middleware
const mysql = require("mysql");
const jwt = require("jsonwebtoken");


const app = express();
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:4200'], // Allow requests from localhost:3000
    methods: ['GET', 'POST' ,'PUT','DELETE'], // Allow methods
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'Shgowsi03@', 
    database: 'register',
});

db.connect(function(err,data) {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return
    }
    // console.log(data);
    // jwt.sign()
});

app.post('/userdetails', (req, res) => {
    const respo = req.body;
    console.log(respo)
    const sql = "SELECT * FROM register.userdetails;";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'Error fetching data from database' });
        }
        const user = data.find(x => x.username === respo.username && x.password === respo.password);
        //  console.log(user)
        const payload = { users: user }; // Wrap data in a plain object

        const secretKey = 'abcdef1234abcdef';
        const token = jwt.sign(payload, secretKey, { expiresIn: '20h' });
        // console.log(token);
        return res.json(token);
    });
});

app.post('/userinfoo', (req, res) => {
    const { username, useremail } = req.body;
    db.query('INSERT INTO newusers.userinfoo (username, useremail) VALUES (?, ?)', [username, useremail], (err, result) => {
      if (err) throw err;
      res.send('User added successfully');
    });
  });

app.post('/userdetails', (req, res) => {
    const { username, useremail, usernumber, password, role, created_at } = req.body;
    //   console.log(req.body)
    const sql = 'INSERT INTO register.userdetails (username, useremail, usernumber, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [username, useremail, usernumber, password, role, created_at], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'Error inserting data into database' });
      }
    //   const screatkey = 'abcdef1234567890abcdef';
    //   const token = jwt.sign(result,screatkey,{expiresIn: '20h'});
    //   return result;
    });
  });

app.listen(8081, () => {
    console.log(`Server running on port 8081`);
});
