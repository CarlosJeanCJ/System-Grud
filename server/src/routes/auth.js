const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendCode } = require("../utils/mailer");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email }))
    return res.status(409).json({ error: "E-mail já cadastrado" });
  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  res.status(201).json({ id: user._id });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Credenciais inválidas" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, user: { name: user.name, email: user.email } });
});

router.post("/forgot", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const code = crypto.randomInt(100000, 999999).toString();
    user.resetCodeHash = await bcrypt.hash(code, 10);
    user.resetCodeExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    await sendCode(user.email, code);
  }
  res.json({ message: "Se o e-mail existir, enviamos um código." });
});

router.post("/reset", async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (
    !user ||
    !user.resetCodeHash ||
    user.resetCodeExpires < Date.now() ||
    !(await bcrypt.compare(code, user.resetCodeHash))
  )
    return res.status(400).json({ error: "Código inválido ou expirado" });
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetCodeHash = undefined;
  user.resetCodeExpires = undefined;
  await user.save();
  res.json({ message: "Senha alterada" });
});

module.exports = router;
