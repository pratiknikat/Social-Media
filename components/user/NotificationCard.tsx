import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Followbackbtn from "@/functions";
const NotificationCard = ({ notifications, mongoUserId1 }: any) => {
  const isAlreadyFollowed = notifications.user1.following;
  // console.log(notifications);
  return (
    <div
      className="flex justify-between my-4 w-full items-center"
      key={notifications.id}
    >
      <Image
        src="/assets/images/batman.webp"
        alt="avatar"
        width={50}
        height={50}
      />
      <p>{notifications.message}</p>
      <p className="max-sm:hidden">
        {new Date(notifications.createdAt).toLocaleString()}
      </p>
      {!isAlreadyFollowed ? (
        <Followbackbtn
          mongoUserId={mongoUserId1}
          user1={notifications.user1._id}
        />
      ) : (
        <p>Following....</p>
      )}
    </div>
  );
};

export default NotificationCard;
