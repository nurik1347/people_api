const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🔹 Barcha userlarni olish
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

// 🔹 Yangi user qo‘shish
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: 'Foydalanuvchini saqlab bo‘lmadi' });
  }
});

// 🔹 Userni yangilash
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Yangilashda xato' });
  }
});

// 🔹 Userni o‘chirish
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Foydalanuvchi o‘chirildi' });
  } catch (err) {
    res.status(400).json({ error: 'O‘chirishda xato' });
  }
});

module.exports = router;
