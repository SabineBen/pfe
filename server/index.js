const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
require('dotenv').config();

const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectDB();

app.use("/", userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
