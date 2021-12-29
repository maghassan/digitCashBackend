require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", userRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Server running @ http://localhost:${PORT}`);
});
