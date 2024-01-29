"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import Post from "@/database/post.model";
import { revalidatePath } from "next/cache";

export async function addPost(params: any) {
  try {
    connectToDatabase();
    const { caption, imageUrl, user, path } = params;
    const newPost = new Post({
      caption,
      imageUrl,
      user,
    });

    const savedPost = await newPost.save();
    const userDoc = await User.findById(user);
    userDoc.posts.push(savedPost._id);
    await userDoc.save();
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPosts() {
  try {
    connectToDatabase();
    const posts = await Post.find().populate("user");
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
