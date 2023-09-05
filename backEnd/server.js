const pool = require("./dbConnection");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.post("/api/post", async (req, res) => {
  const { firstname, lastname, email, mobile_number, dob, address } = req.body;
  const sqlInsert =
    "INSERT INTO employees(firstname, lastname, email, mobile_number, dob, address) VALUES ($1, $2, $3, $4, $5, $6)";

  try {
    const result = await pool.query(sqlInsert, [
      firstname,
      lastname,
      email,
      mobile_number,
      dob,
      address,
    ]);
    console.log("Data inserted successfully");
    res.status(201).json({ message: "Record inserted successfully" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get", (req, res) => {
  const sqlGet = "SELECT * FROM employees ORDER BY id DESC";
  pool.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;

  const sqlGet = "SELECT * FROM employees WHERE id = $1";

  pool.query(sqlGet, [id], (error, result) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.send(result.rows);
    }
  });
});
app.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM employees WHERE id = $1";

  try {
    const result = await pool.query(sqlRemove, [id]);

    if (result.rowCount === 1) {
      res.status(200).json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/put/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, mobile_number, dob, address } = req.body;

  const sqlUpdate =
    "UPDATE employees SET firstname=$1, lastname=$2, email=$3, mobile_number=$4, dob=$5, address=$6 WHERE id=$7";
  pool.query(
    sqlUpdate,
    [firstname, lastname, email, mobile_number, dob, address, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Record updated successfully" });
      }
    }
  );
});

app.get("/get/email/:email", async (req, res) => {
  const email = req.params["email"]; // Get email from URL parameter
  console.log(email);

  try {
    const sqlGet = "SELECT * FROM employees WHERE email = $1";

    const result = await pool.query(sqlGet, [email]);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error getting user by email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5001, () => {
  console.log("listing port on 5001");
});
