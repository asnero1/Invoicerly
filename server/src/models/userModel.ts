import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
