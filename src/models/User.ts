import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  profession?: string;
  countryCode: string;
  timezone: string;
  role: 'user' | 'admin';
  status: 'ACTIVE' | 'DELETED' | 'ONHOLD';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    profession: { type: String },
    countryCode: { type: String, default: '+91' },
    timezone: { type: String, default: 'Asia/Kolkata' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['ACTIVE', 'DELETED', 'ONHOLD'], default: 'ACTIVE' },
  },
  { timestamps: true }
);

// Indexes for fast querying (e.g., date ranges, email lookups)
UserSchema.index({ createdAt: -1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
