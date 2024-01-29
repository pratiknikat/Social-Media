"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose"; // Assuming this is where you handle database connection
import Story from "@/database/story.model";
import { revalidatePath } from "next/cache";

export async function addStory(params: any) {
  try {
    connectToDatabase();

    const { mediaUrl, expiresAt, user, path } = params;
    const newStory = new Story({
      user,
      mediaUrl,
      expiresAt,
    });

    const savedStory = await newStory.save();
    const userDoc = await User.findById(user);
    userDoc.posts.push(savedStory._id);
    await userDoc.save();
    revalidatePath(path);
    return savedStory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
