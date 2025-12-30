// src/models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "supervisor" | "employee";
  createdAt: Date;
  mobile?: string;
  employeeId?: string;
  department?: string;
  zone?: string;
  division?: string;
  address?: string;
  bankAccount?: string;
  ifsc?: string;
  pfNumber?: string;
  esicNumber?: string;
  avatarUrl?: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "supervisor", "employee"], default: "employee" },
  mobile: { type: String },
  employeeId: { type: String },
  department: { type: String },
  zone: { type: String },
  division: { type: String },
  address: { type: String },
  bankAccount: { type: String },
  ifsc: { type: String },
  pfNumber: { type: String },
  esicNumber: { type: String },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const UserModel: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default UserModel;

