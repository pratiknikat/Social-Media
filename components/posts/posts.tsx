import React from "react";
import ShowPost from "../cards/ShowPost";

const Posts = async ({ posts }: any) => {
  return (
    <div>
      {posts.map((post: any, index: number) => {
        return <ShowPost key={index} post={post} />;
      })}
    </div>
  );
};

export default Posts;
