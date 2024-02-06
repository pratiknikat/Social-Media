import React from "react";
import Image from "next/image";
import { Input } from "../ui/input";
const ShowPost = ({ post }: any) => {
  return (
    <>
      <div
        style={{ borderRadius: "10px" }}
        className="w-[70%] bg-red-50 m-auto px-4 mb-4 py-3 border-2 border-black-100 rounded-md max-sm:w-full"
      >
        <div className="flex mb-3 justify-between items-center pr-2">
          <div className="flex gap-2">
            <Image
              src="/assets/images/batman.webp"
              alt="post"
              width={30}
              height={30}
              style={{ borderRadius: "50%" }}
            />
            <p>{post?.user.username}</p>
          </div>
          <Image src="/assets/icons/more.svg" alt="more" width={4} height={4} />
        </div>
        <div className="border-1 border-l-amber-900">
          <Image
            src={post?.imageUrl}
            alt="post"
            width={300}
            height={300}
            layout="responsive"
            className="w-[90%] h-auto"
          />
        </div>
        <div className="flex justify-between mt-2 px-2">
          <div className="flex gap-2">
            <Image
              src="/assets/icons/love.svg"
              width={30}
              height={30}
              alt="like"
            />
            <Image
              src="/assets/icons/comment.svg"
              width={25}
              height={25}
              alt="comment"
            />
            <Image
              src="/assets/icons/share.svg"
              width={22}
              height={22}
              alt="share"
            />
          </div>
          <Image
            src="/assets/icons/save.svg"
            width={22}
            height={22}
            alt="save"
          />
        </div>
        <div className="flex gap-2 mt-2 text-[14px]">
          <p>
            <span className="font-bold">{post.user.username} </span>
            <span className="text-gray-400 cursor-pointer">{post.caption}</span>
          </p>
        </div>
        <div className="flex gap-2 mt-2">
          <p className="text-gray-400 text-[13px]">View all 100 comments</p>
        </div>

        <div className="flex mb-3  mt-3 items-center justify-between pr-2">
          <div className="flex gap-2">
            <Image
              src="/assets/images/batman.webp"
              alt="post"
              width={40}
              height={30}
              style={{ borderRadius: "50%" }}
            />
            <Input
              type="text"
              placeholder="Add a comment ..."
              style={{ borderRadius: "5px", border: "none" }}
            />
          </div>
          <Image
            src="/assets/icons/send.svg"
            alt="send"
            width={25}
            height={25}
          />
        </div>
      </div>
    </>
  );
};

export default ShowPost;

// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import { Input } from "../ui/input";

// const ShowPost = ({ post }: any) => {
//   const { caption, imageUrl, user } = post;
//   const initialCaption = caption;
//   const [showFullCaption, setShowFullCaption] = useState(false);
//   const maxLength = 8;

//   const shortenedCaption = showFullCaption
//     ? initialCaption
//     : `${caption.split(" ").slice(0, maxLength).join(" ")}...`;

//   return (
//     <div
//       style={{ borderRadius: "10px" }}
//       className="w-[70%] bg-red-50 m-auto px-4 mb-4 py-3 border-2 border-black-100 rounded-md max-sm:w-full"
//     >
//       <div className="flex mb-3 justify-between items-center pr-2">
//         <div className="flex gap-2">
//           <Image
//             src={user.picture}
//             alt="post"
//             width={30}
//             height={30}
//             style={{ borderRadius: "50%" }}
//           />
//           <p>{user.username}</p>
//         </div>
//         <Image src="/assets/icons/more.svg" alt="more" width={4} height={4} />
//       </div>

//       <div className="border-1 border-l-amber-900">
//         <Image
//           src={imageUrl}
//           alt="post"
//           width={300}
//           height={300}
//           layout="responsive"
//           className="w-[90%] h-auto"
//         />
//       </div>
//       <div className="flex justify-between mt-2 px-2">
//         <div className="flex gap-2">
//           <Image
//             src="/assets/icons/love.svg"
//             width={30}
//             height={30}
//             alt="like"
//           />
//           <Image
//             src="/assets/icons/comment.svg"
//             width={25}
//             height={25}
//             alt="comment"
//           />
//           <Image
//             src="/assets/icons/share.svg"
//             width={22}
//             height={22}
//             alt="share"
//           />
//         </div>
//         <Image src="/assets/icons/save.svg" width={22} height={22} alt="save" />
//       </div>

//       <div className="flex gap-2 mt-2 text-[14px]">
//         <p>
//           <span className="font-bold">{user.username} </span>
//           {shortenedCaption}
//           {!showFullCaption && (
//             <span
//               className="text-gray-400 cursor-pointer"
//               onClick={() => setShowFullCaption(true)}
//             >
//               {" "}
//               more
//             </span>
//           )}
//         </p>
//       </div>

//       <div className="flex gap-2 mt-2">
//         <p className="text-gray-400 text-[13px]">View all 100 comments</p>
//       </div>

//       <div className="flex mb-3  mt-3 items-center justify-between pr-2">
//         <div className="flex gap-2">
//           <Image
//             src={user.picture}
//             alt="post"
//             width={40}
//             height={30}
//             style={{ borderRadius: "50%" }}
//           />
//           <Input
//             type="text"
//             placeholder="Add a comment ..."
//             style={{ borderRadius: "5px", border: "none" }}
//           />
//         </div>
//         <Image src="/assets/icons/send.svg" alt="send" width={25} height={25} />
//       </div>
//     </div>
//   );
// };

// export default ShowPost;
