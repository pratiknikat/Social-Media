import ShowPost from "@/components/cards/ShowPost";
import Story from "@/components/story/Story";
import React from "react";

const page = () => {
  return (
    <div>
      <Story />
      <ShowPost />
      <ShowPost />
    </div>
  );
};

export default page;
