import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ayesha#786",
  database: "crud",
});

app.get("/", (req, res) => {
  res.json("Hello this is a backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`id`,`title`, `description`, `price`, `cover`) VALUES (?)";
  const values = [
    // "title from backend",
    // "desc from backend",
    // "cover picture from backend",o
    req.body.id,
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book added");
  });
});
app.listen(8000, () => {
  console.log("Connected to backend");
});
