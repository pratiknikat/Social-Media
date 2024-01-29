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

// Handle follo wer
export async function followUser(userId: string, followerId: string) {
  try {
    const userToFollow = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!userToFollow || !follower) {
      throw new Error("User or follower not found");
    }

    // Check if the follower is already following the user
    if (!follower.following.includes(userId)) {
      follower.following.push(userId);
      await follower.save();
    }

    if (!userToFollow.followers.includes(followerId)) {
      userToFollow.followers.push(followerId);
      await userToFollow.save();

      const notification = new Notification({
        message: `${follower.username} started following you.`,
        user1: followerId,
        user2: userId,
      });
      await notification.save();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
