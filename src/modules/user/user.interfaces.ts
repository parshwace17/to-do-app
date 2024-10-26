import mongoose, { Document, Model } from "mongoose";

export interface IRefreshToken {
  token: string;
  createdAt: Date;
}

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password: string;
  refreshTokens: IRefreshToken[];
  isEmailVerified: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(
    email: string,
    excludeUserId: mongoose.ObjectId
  ): Promise<boolean>;
  // Add any other static methods you need here
}
