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
    "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)";
  const values = [
    // "title from backend",
    // "desc from backend",
    // "cover picture from backend",o
    // req.body.id,
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Book added");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` =?, `desc`=?, `price`=?, `cover`=? WHERE id=?";
  const values=[
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ]
  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Book has been updated successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Boo has been deleted successfully");
  });
});

app.listen(8000, () => {
  console.log("Connected to backend");
});
