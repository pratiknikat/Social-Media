import mongoose, { Schema, models, model, Document } from "mongoose";

export interface INotification extends Document {
  message: string;
  user1: Schema.Types.ObjectId;
  user2: Schema.Types.ObjectId;
  createdAt: Date;
}

const NotificationSchema = new Schema({
  message: { type: String, required: true },
  user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Notification =
  models?.Notification ||
  model<INotification>("Notification", NotificationSchema);

export default Notification;
