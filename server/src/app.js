require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { rateLimit } = require("express-rate-limit");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use(
  "/auth",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 50 }),
  require("./routes/auth")
);
app.use("/expenses", require("./routes/expenses"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`API rodando na porta ${port}`));
  })
  .catch(console.error);