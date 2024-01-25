import Post from "@/database/post.model";
import { connectToDatabase } from "../mongoose";
import { AddPostParams } from "./shared.type";

export async function addPost(params: AddPostParams) {
  try {
    connectToDatabase();
    const { caption, imageUrl, user, path } = params;
    // Create the question
    const post = await Post.create({
      caption,
      imageUrl,
      user,
    });
    // const tagDocuments = [];
    // Create the tags or get them if they already exist
    // for (const tag of tags) {
    //   const existingTag = await Tag.findOneAndUpdate(
    //     { name: { $regex: new RegExp(`^${tag}$`, "i") } },
    //     { $setOnInsert: { name: tag }, $push: { questions: question._id } },
    //     { upsert: true, new: true }
    //   );
    //   tagDocuments.push(existingTag._id);
    // }
    // await Question.findByIdAndUpdate(question._id, {
    //   $push: { tags: { $each: tagDocuments } },
    // });
    // await Interaction.create({
    //   user: author,
    //   action: "ask_question",
    //   question: question._id,
    //   tags: tagDocuments,
    // });
    // await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });
    // revalidatePath(path);
    return post;
  } catch (error) {
    console.error(error);
  }
}
