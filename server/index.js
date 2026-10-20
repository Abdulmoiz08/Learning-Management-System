const express = require("express");
const { createServer } = require("node:http");
const connectDB = require("./db");
const cors = require("cors");

const TeacherRoutes = require("./routes/TeacherRoutes");
const StudentRoutes = require("./routes/StudentRoutes");
const scriptRoutes = require("./routes/ScriptsRoutes");

require("./cron/hardDelete.cron");
require("dotenv").config();

const { initSocket } = require("./socket-io");

const app = express();
const server = createServer(app);

// middleware
app.use(cors("*"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/teacher", TeacherRoutes);
app.use("/student", StudentRoutes);
app.use("/scripts", scriptRoutes);

connectDB();

// 🔥 initialize socket
initSocket(server);

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
