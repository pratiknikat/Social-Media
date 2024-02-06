"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import Notification from "@/database/notification.model";
export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllUser(params: any) {
  try {
    connectToDatabase();
    const user = await User.find({ clerkId: { $ne: params.userId } });
    return user;
  } catch (error) {}
}

export async function followUser({ user1Id, user2Id }: any) {
  try {
    const user1 = await User.findById(user1Id);
    const user2 = await User.findById(user2Id);
    if (!user1 || !user2) {
      throw new Error("User or follower not found");
    }

    if (!user1.followers?.includes(user2._id)) {
      user1.followers?.push(user2._id);
      await user1.save();

      if (!user2.following?.includes(user1._id)) {
        user2.following?.push(user1._id);
        await user2.save();
      }

      const notification = new Notification({
        message: `${user2.username} started following you.`,
        user1: user2._id,
        user2: user1._id,
      });
      await notification.save();
      // push to user1 notifications
      user2.notification?.push(notification._id);
      await user2.save();
      // console.log(user2);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNotifications({ mongoUserId }: any) {
  try {
    const user = await Notification.find({ user2: mongoUserId }).populate(
      "user1"
    );
    // console.log(user);

    return user || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
