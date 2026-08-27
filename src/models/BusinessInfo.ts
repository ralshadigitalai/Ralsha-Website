import mongoose, { Schema, Document } from 'mongoose';

export interface IBusinessInfo extends Document {
  userId: mongoose.Types.ObjectId;
  monthlyAdSpend: string;
  productsSold: string;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessInfoSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    monthlyAdSpend: { type: String, required: true },
    productsSold: { type: String, required: true },
  },
  { timestamps: true }
);

// Index is auto-created by `unique: true` in schema.

export const BusinessInfo = mongoose.models.BusinessInfo || mongoose.model<IBusinessInfo>('BusinessInfo', BusinessInfoSchema);
