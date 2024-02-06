import {
  followUser,
  getNotifications,
  getUserById,
} from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import NotificationCard from "@/components/user/NotificationCard";
const page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });
  const mongoUserId = mongoUser._id.toString();

  const result = await getNotifications({ mongoUserId: mongoUserId });
  return (
    <div className="mt-6">
      {result.length > 0 ? (
        result?.map((notification: any) => {
          return (
            <NotificationCard
              notifications={notification}
              mongoUserId1={mongoUserId}
            />
          );
        })
      ) : (
        <p>No Notfications</p>
      )}
    </div>
  );
};

export default page;
