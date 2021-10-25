const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "MovieSystem",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const Agegroup = req.body.Agegroup;
  const type = req.body.type;
  const review = req.body.review;
  const Likes = req.body.Likes;

  db.query(
    "INSERT INTO Movies (name, Agegroup, type, review, Likes) VALUES (?,?,?,?,?)",
    [name, Agegroup, type, review, Likes],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/Movies", (req, res) => {
  db.query("SELECT * FROM Movies", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const Likes = req.body.Likes;
  db.query(
    "UPDATE Movies SET Likes = ? WHERE id = ?",
    [Likes, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Movies WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
