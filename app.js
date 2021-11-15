require("dotenv/config");

// Connects to the database
require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const allRoutes = require("./routes");
app.use("/api", allRoutes);

// const index = require("./routes/index");
// app.use("/", index);

const seniorRouter = require("./routes/senior.routes");
app.use("/api", seniorRouter);

const needRouter = require("./routes/need.routes");
app.use("/api", needRouter);

const authRouter = require("./routes/auth");
app.use("/api", authRouter);

require("./error-handling")(app);

module.exports = app;
