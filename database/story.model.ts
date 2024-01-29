import mongoose, { Schema, Document } from "mongoose";

export interface IStory extends Document {
  user: Schema.Types.ObjectId;
  mediaUrl: string;
  createdAt: Date;
  expiresAt: Date;
  viewers: Schema.Types.ObjectId[];
}

const StorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mediaUrl: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  viewers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Story =
  mongoose.models?.Story || mongoose.model<IStory>("Story", StorySchema);

export default Story;
