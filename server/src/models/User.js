const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true, lowercase: true },
      password: String,
      resetCodeHash: String,
      resetCodeExpires: Date,
    },
    { timestamps: true }
  )
);
