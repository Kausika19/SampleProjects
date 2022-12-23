const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

app.get("/login", async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM user_details");
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user_email, user_pw } = req.body;

    const user = await pool.query(
      "SELECT * FROM user_details WHERE user_email=$1",
      [user_email]
    );

    if (user.rowCount > 0) {
      const pw = user.rows[0].user_pw;
      const isMatch = await bcrypt.compare(user_pw, pw);
      if (isMatch) {
        const name = user.rows[0].user_name;
        res.json({ loggedIn: true, user_name: name });
      } else {
        res.json({ loggedIn: false, status: "Wrong username or password!" });
      }
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { user_name, user_email, user_pw } = req.body;

    const checkuser = await pool.query(
      "SELECT user_email FROM user_details WHERE user_email=$1",
      [user_email]
    );

    if (checkuser.rowCount === 0) {
      const hash = await bcrypt.hash(user_pw, 13);

      const newuser = await pool.query(
        `INSERT INTO user_details (user_name, user_email, user_pw) VALUES ($1, $2, $3)`,
        [user_name, user_email, hash]
      );
      res.json({ registered: true, status: "Account created" });
    } else {
      res.json({ registered: false, status: "Email is already registered" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
