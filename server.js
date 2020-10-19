const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//? Load env vars
dotenv.config({ path: "./config/config.env" });

//? Connect to DB
connectDB();

//? Route Files
const todos = require("./routes/todos");
const auth = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5005;

app.use(cors());
//? Body Parser
app.use(express.json());
//? Cookie Parser
app.use(cookieParser());

//? Dev logging Middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

//? Mount routers
app.use("/api/v1/todos", todos);
app.use("/api/v1/auth", auth);

//? Use error Handler
app.use(errorHandler);

app.listen(port, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
	);
});

module.exports = app;
