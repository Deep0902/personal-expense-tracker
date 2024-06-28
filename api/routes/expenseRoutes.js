import express from 'express';
import Expense from '../models/expense.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
