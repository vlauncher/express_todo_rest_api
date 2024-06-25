const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

app.use("/todos", require("./routes/todos"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));