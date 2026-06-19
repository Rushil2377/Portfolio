import mongoose, { Schema } from 'mongoose';

export const ProjectSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  imageHint: { type: String, default: 'custom' },
  tags: { type: [String], default: [] },
  span: { type: String, default: '' },
  previewUrl: { type: String, default: '' },
  customImage: { type: String, default: '' }
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
