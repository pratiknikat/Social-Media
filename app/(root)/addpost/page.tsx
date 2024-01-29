import Post from "@/components/forms/Post";
import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <p className="text-[30px] mb-5 ">Add Post</p>
      <Post mongoUserId={JSON.stringify(mongoUser?._id)} />
    </div>
  );
};

export default page;
