import { Schema, models, model, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  picture: string;
  stories?: Schema.Types.ObjectId[]; // Array of references to stories
  posts?: Schema.Types.ObjectId[];
  saved?: Schema.Types.ObjectId[];
  followers?: Schema.Types.ObjectId[];
  following?: Schema.Types.ObjectId[];
  notification?: Schema.Types.ObjectId[];
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
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }], // Array of references to stories
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  notification: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
