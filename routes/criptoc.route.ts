import { Router } from 'express';
import criptocModel from '../models/criptoc.model';
import { ICriptoc } from '../models/criptoc.model';

const router = Router();

// Fetch all crypto
router.get('/', async (req, res) => {
  try {
    const criptocs = await criptocModel.find({});
    res.json(criptocs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post crypto
router.post('/', async (req, res) => {
  try {
    const criptocThatMayExist = await criptocModel.findOne({
      symbol: req.body.symbol,
    });

    if (req.body.symbol === criptocThatMayExist?.symbol) {
      res
        .status(409)
        .json({ message: 'Crypto with this symbol already exists' });
      return;
    }

    const criptoc = new criptocModel({
      name: req.body.name,
      symbol: req.body.symbol,
      description: req.body.description,
      price: req.body.price,
      change_24h: req.body.change_24h,
      cap: req.body.cap,
    });
    await criptoc.save();

    res.status(201).json({ message: 'Crypo created succesfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TOP VALUE Crypto

router.get('/topvalue', async (req, res) => {
  try {
    const criptocs = await criptocModel
      .find({})
      .sort({ price: 'desc' })
      .limit(10);
    res.json(criptocs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch one crypto
router.get('/:id', async (req, res) => {
  try {
    const criptoc = await criptocModel.findOne({ symbol: req.params.id });

    if (criptoc) {
      res.json(criptoc);
    } else {
      res.status(404).json({ message: `Could not find crypto with that id` });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one crypto
router.delete('/:id', async (req, res) => {
  try {
    const query = await criptocModel.deleteOne({ symbol: req.params.id });

    if (query.deletedCount === 0) {
      res
        .status(404)
        .json({ message: `Delete failed. Crypto with that id does not exist` });
    } else {
      res.json({ message: 'Resource deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update one crypto
router.put('/:id', async (req, res) => {
  try {
    const query = await criptocModel.updateOne(
      {
        symbol: req.params.id,
      },
      req.body
    );

    if (query) {
      res.status(200).json({ message: 'Resource updated successfully' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Raise crypto value
router.put('/up/:id', async (req, res) => {
  try {
    const criptoc = await criptocModel.findOne({
      symbol: req.params.id,
    });

    if (criptoc) {
      criptoc.price += 10;
      await criptoc.save();
      res
        .status(200)
        .json({ message: 'Resource price increased successfully' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lower crypto value
router.put('/down/:id', async (req, res) => {
  try {
    const criptoc = await criptocModel.findOne({
      symbol: req.params.id,
    });

    if (criptoc) {
      criptoc.price -= 10;
      await criptoc.save();
      res
        .status(200)
        .json({ message: 'Resource price decreased successfully' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
