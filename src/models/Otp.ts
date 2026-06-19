import mongoose, { Schema } from 'mongoose';

export const OtpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  type: { type: String, enum: ['register', 'login'], required: true },
  passwordHash: { type: String } // stored only for type: 'register'
}, { timestamps: true });

// Setup a TTL index so MongoDB automatically deletes expired OTPs
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.models.Otp || mongoose.model('Otp', OtpSchema);
