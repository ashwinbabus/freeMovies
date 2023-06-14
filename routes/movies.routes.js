const express = require("express");
const router = express.Router();
const pool = require("../db");

// get columns
router.get("/columns", async (req, res) => {
  try {
    const query = await pool.query(
      "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'movies'",
    );
    // const columns = {};
    // query.rows.forEach(row => {
    //   const column_name = row.column_name;
    //   columns[column_name] = "";
    // });
    const columns = query.rows.map(row => row.column_name);
    res.json(columns);
  } catch (err) {
    res.send(err);
  }
});

// get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await pool.query("SELECT * FROM movies");
    res.json(movies.rows);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

module.exports = router;

// Create a new movie
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      genre,
      release_year,
      director,
      lead_actor,
      lead_actress,
      youtube_url,
      thumbnail_url,
      rating,
      views,
      likes,
      dislikes,
    } = req.body;

    const query = `INSERT INTO movies 
      (title, description, duration, genre, release_year, director, lead_actor, lead_actress, youtube_url, thumbnail_url, rating, views, likes, dislikes)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;

    const values = [
      title,
      description,
      duration,
      genre,
      release_year,
      director,
      lead_actor,
      lead_actress,
      youtube_url,
      thumbnail_url,
      rating,
      views,
      likes,
      dislikes,
    ];
    await pool.query(query, values);
    res.send("Movie added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
