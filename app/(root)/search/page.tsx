import LocalSearchBar from "@/components/shared/LocalSearchBar";
import UserCard from "@/components/user/UserCard";
import { getAllUser, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });
  const result = await getAllUser({});
  return (
    <div className=" w-[80%]  max-sm:w-full justify-center m-auto align-middle">
      <div>
        <LocalSearchBar />
      </div>
      <div className="mt-6 w-[70%] max-sm:w-full sm:w-full">
        {result?.map((user) => {
          return <UserCard user1={mongoUser} user2={user} />;
        })}
      </div>
    </div>
  );
};

export default page;
