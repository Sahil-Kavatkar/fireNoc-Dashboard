import mongoose from 'mongoose';
import Building from './building.js';

const userSchema = new mongoose.Schema({
  name: String,
  descriptor: [Number],
  employeeId: { type: String},
  email: { type: String},
  phone: { type: String},
  assignedBuildings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Building' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
