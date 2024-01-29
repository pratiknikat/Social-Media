import LocalSearchBar from "@/components/shared/LocalSearchBar";
import UserCard from "@/components/user/UserCard";
import { getAllUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect("/sign-in");
  }
  const result = await getAllUser({ clerkId });
  return (
    <div className=" w-[80%]  max-sm:w-full justify-center m-auto align-middle">
      <div>
        <LocalSearchBar />
      </div>
      <div className="mt-6 w-[70%] max-sm:w-full sm:w-full">
        {result?.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
};

export default page;
