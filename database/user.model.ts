import { Schema, models, model, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  picture: string;
  story?: Schema.Types.ObjectId;
  posts?: Schema.Types.ObjectId[];
  saved?: Schema.Types.ObjectId[];
  followers?: Schema.Types.ObjectId[]; // Array of references to followers
  following?: Schema.Types.ObjectId[]; // Array of references to users being followed
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: { type: String, required: true },
  bio: { type: String },
  picture: { type: String, required: true },
  story: { type: Schema.Types.ObjectId, ref: "Story" },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of references to followers
  following: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of references to users being followed
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
