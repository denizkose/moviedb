import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  favourites: object[];
  userType: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favourites: {
      type: [String],
    },
    userType: {
      type: String,
    },
  },
  { timestamps: true, collection: 'users' }
);

export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
