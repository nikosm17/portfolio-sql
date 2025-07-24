  const mysql = require('mysql')
  const express = require('express');
  const path = require('path');
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));


  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_form"
  });

  con.connect(function(err){
    if (err) throw error;
    console.log("Connected");
  });

  app.post('/register', (req, res) => {
  const { email, password } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  con.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ success: false});

    if (results.length > 0) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    con.query(insertQuery, [email, password], (err, result) => {
      if (err) return res.status(500).json({ success: false});
      res.json({ success: true });
    });
  });
});


app.post('/login', (req, res) => {
  const { userinput, passinput } = req.body;

  const loginQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
  con.query(loginQuery, [userinput, passinput], (err, results) => {
    if (err) return res.status(500).json({ success: false });
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});


  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
