import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
});

export interface Event extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
