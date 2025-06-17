const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000; 

app.use(express.static(path.join(__dirname, '../html')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/resources', express.static(path.join(__dirname, '../resources')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/js', express.static(path.join(__dirname, '../js')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'java',
  database: 'orange_farm'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/submit', upload.single('file'), (req, res) => {
  const { name, country, type, date, description } = req.body;
  const organic = req.body.organic === 'yes' ? 1 : 0;
  const fileName = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO contributions (farm_name, country, orange_kind, contribution_date, description, certified_organic, file_name)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, country, type, date, description, organic, fileName], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.send('Form submitted successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.get('/contributions', (req, res) => {
  const orangeType = req.query.type;

  let sql = 'SELECT * FROM contributions';
  const params = [];

  if (orangeType) {
    sql += ' WHERE orange_kind = ?';
    params.push(orangeType);
  }

  sql += ' ORDER BY contribution_date DESC';

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});