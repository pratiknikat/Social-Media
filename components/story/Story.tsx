import React from "react";
import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
export interface story {
  image: string;
  user: string;
}

export const list: story[] = [
  {
    image: "/assets/images/batman.webp",
    user: "pratik_n_987",
  },
  {
    image: "/assets/images/batman.webp",
    user: "om_pawar",
  },
  {
    image: "/assets/images/batman.webp",
    user: "siddhi patil",
  },
  {
    image: "/assets/images/batman.webp",
    user: "siddhi patil",
  },
];

const Story = () => {
  return (
    <ScrollArea className="w-[340px]">
      <div className="flex w-max space-x-4 p-4 ">
        {list.map((story) => (
          <div className="overflow-hidden flex flex-col items-center align-middle ">
            <Image
              src={story.image}
              alt="story"
              width={70}
              height={70}
              style={{
                borderRadius: "50%",
                border: "3px solid",
                background:
                  "rgb(131,58,180) linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(184,82,202,1) 6%, rgba(203,73,203,1) 9%, rgba(228,71,184,1) 16%, rgba(216,58,160,1) 18%, rgba(206,47,145,1) 19%, rgba(187,45,111,1) 23%, rgba(201,69,111,1) 29%, rgba(226,94,101,1) 45%, rgba(222,104,104,1) 50%, rgba(252,176,69,1) 100%)",
              }}
            />

            <p className="text-[13px]">{story.user}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Story;
