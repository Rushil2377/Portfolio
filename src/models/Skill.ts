import mongoose, { Schema } from 'mongoose';

export const SkillSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true, default: 'Code' },
  level: { type: String, required: true }
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
