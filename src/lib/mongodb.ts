import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongooseInstance) => {
      // Seed Admin user
      try {
        const { UserSchema } = await import('@/models/User');
        const User = mongooseInstance.models.User || mongooseInstance.model('User', UserSchema);
        
        const adminEmail = 'rushilmarvaniya@gmail.com';
        const adminExists = await User.findOne({ email: adminEmail });
        
        if (!adminExists) {
          const hashedPassword = await bcrypt.hash('Rushil@2307', 10);
          await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
          });
          console.log('Seeded Admin account successfully');
        }
      } catch (err) {
        console.error('Failed to seed admin account:', err);
      }
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
