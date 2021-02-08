import { Router } from 'express';
import criptocModel from '../models/criptoc.model';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const criptocs = await criptocModel.find();
    res.json(criptocs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const criptoc = new criptocModel({});
    res.status(201).json(criptoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
