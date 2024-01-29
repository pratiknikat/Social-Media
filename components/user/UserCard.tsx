import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs";
import { followUser, getUserById } from "@/lib/actions/user.action";

const userCard = ({ user }: any) => {
  const { userId } = auth();
  const handlefollow = async () => {
    try {
      await followUser(userId, user.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between my-4 w-full items-center">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="ml-4">{user.username}</p>
      </div>
      <Button className="btn-primary1" onClick={handlefollow}>
        Follow
      </Button>
    </div>
  );
};

export default userCard;
