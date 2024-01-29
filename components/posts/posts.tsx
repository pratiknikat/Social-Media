import React from "react";
import ShowPost from "../cards/ShowPost";

const Posts = async ({ posts }: any) => {
  return (
    <div>
      {posts.map((post: any, index: number) => {
        // return <ShowPost key={index} post={post} />;÷\

        return <h1>{post.user.name}</h1>;
      })}
    </div>
  );
};

export default Posts;
