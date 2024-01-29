import React from "react";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddStory from "../story/AddStory";
import { Button } from "../ui/button";
import ViewStory from "../story/VIewStory";

interface Props {
  image: string;
  story: ["Chapter 1", "Chapter 2"];
}
const UserProfile = ({ image, story }: Props) => {
  return (
    <div>
      <div className="mb-4 sm:mb-0 sm:mr-4">
        <Dialog>
          <DialogTrigger>
            {" "}
            <Image
              src="/assets/images/batman.webp"
              alt="profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </DialogTrigger>
          <DialogContent className="bg-white p-9">
            <AddStory mongoUserId={""} />
            <div>{story.length > 0 && <ViewStory />}</div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
