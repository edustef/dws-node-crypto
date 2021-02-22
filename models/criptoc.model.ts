import mongoose, { Schema, model, Document } from 'mongoose';

export interface ICriptoc {
  name: string;
  symbol: string;
  description: string;
  price: number;
  change_24h: number;
  cap: number;
}

interface ICriptocDoc extends ICriptoc, Document {}

const CriptocSchema = new Schema({
  name: { type: String, required: true },
  symbol: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 3,
    uppercase: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  change_24h: { type: Number, required: true },
  cap: { type: Number, required: true },
});

export default model<ICriptocDoc>('Criptoc', CriptocSchema, 'criptoc');
