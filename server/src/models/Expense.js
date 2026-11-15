const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Expense",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      category: String,
      date: { type: Date, default: Date.now },
    },
    { timestamps: true }
  )
);