const router = require("express").Router();
const auth = require("../middleware/auth");
const Expense = require("../models/Expense");

router.use(auth);

router.get("/", async (req, res) => {
  res.json(await Expense.find({ user: req.userId }).sort({ date: -1 }));
});

router.post("/", async (req, res) => {
  const { description, amount, category, date } = req.body;
  const expense = await Expense.create({
    user: req.userId,
    description,
    amount,
    category,
    date,
  });
  res.status(201).json(expense);
});

router.put("/:id", async (req, res) => {
  const { description, amount, category, date } = req.body;
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { description, amount, category, date },
    { new: true }
  );
  if (!expense) return res.status(404).json({ error: "Não encontrado" });
  res.json(expense);
});

router.delete("/:id", async (req, res) => {
  const expense = await Expense.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });
  if (!expense) return res.status(404).json({ error: "Não encontrado" });
  res.status(204).end();
});

module.exports = router;