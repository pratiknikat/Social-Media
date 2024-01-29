import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IPost extends Document {
  caption: string;
  tags: Schema.Types.ObjectId[];
  imageUrl: string;
  views: number;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
  share: Schema.Types.ObjectId[];
  user: Schema.Types.ObjectId;
  createdAt: Date;
}

const PostSchema = new Schema({
  caption: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  imageUrl: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  share: [{ type: Schema.Types.ObjectId, ref: "User" }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = models?.Post || model("Post", PostSchema);

export default Post;
