import { SignedIn, auth } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { URLProps } from "@/types";

import UserProfile from "@/components/profile/UserProfile";

const Page = async ({ params }: URLProps) => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId: params.id });
  const { name, username, bio, picture, followers, following, posts, stories } =
    mongoUser;

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <p className="text-2xl font-bold mb-4">{username}</p>

      <div className="flex items-center mr-16 max-sm:mr-0 sm:flex-row sm:items-center justify-between">
        <UserProfile
          image={picture || "/images/default_avatar.png"}
          story={stories}
        />
        <div className="flex gap-4">
          <div className="text-center">
            <div className="font-bold">{posts.length}</div>
            <div className="text-sm">posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{followers.length}</div>
            <div className="text-sm">followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{following.length}</div>
            <div className="text-sm">following</div>
          </div>
        </div>
      </div>
      {/* bio */}
      <div className="mt-4 text-sm">
        <div className="font-bold">{name}</div>
        <div>👨‍💻 {bio}</div>
        {/* <div>📍 Pune, India</div> */}
        {/* <div>📧 pratikn987@gmail.com</div> */}
      </div>
      <div className="flex mt-6 gap-4 max-sm:justify-center nax-sm:items-center">
        <SignedIn>
          {clerkId == mongoUser.clerkId && (
            <>
              <Link href="/profile/edit">
                <Button className="btn-primary">Edit Profile</Button>
              </Link>
              <Button className="btn-primary">Share Profile</Button>
            </>
          )}
        </SignedIn>
      </div>
      <Tabs defaultValue="posts" className="w-full mt-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">
            <Image
              src="/assets/icons/collage.svg"
              width={27}
              height={27}
              alt="posts"
            />
          </TabsTrigger>
          <TabsTrigger value="reels">
            <Image
              src="/assets/icons/reels.svg"
              width={27}
              height={27}
              alt="reels"
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          Capture the moments with a friend
        </TabsContent>
        <TabsContent value="reels">Change your reels here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
