const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const todos = require("./routes/todos");

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

app.use("/api/v1/todos", todos);

app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
	);
});

module.exports = app;
