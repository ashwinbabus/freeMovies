const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

const movies = require("./routes/movies.routes");

app.use("/movies", movies);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
