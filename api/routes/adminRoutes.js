import express from 'express';
import Admin from '../models/admin.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
