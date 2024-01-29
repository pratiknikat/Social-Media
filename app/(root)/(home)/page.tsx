import AddStory from "@/components/story/AddStory";
import Story from "@/components/story/Story";
import { getPosts } from "@/lib/actions/post.action";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import React from "react";
import { getUserById } from "@/lib/actions/user.action";

import Posts from "@/components/posts/posts";
const page = async () => {
  const { userId } = auth();

  const posts = await getPosts();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <Story />
      {/* <ViewStory /> */}
      <AddStory mongoUserId={JSON.stringify(mongoUser?._id)} />
      <div>
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default page;
