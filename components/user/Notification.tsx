// import Image from "next/image";
// import { Button } from "../ui/button";
// import React from "react";
// import { followUser } from "@/lib/actions/user.action";
// import { handlefollow } from "@/functions";

// const Notification = ({ results, mongoUserId1 }: any) => {
//   return (
//     <div>
//       {results ? (
//         results.length > 0 ? (
//           results.map((notification: any) => (
//             <div key={notification.id}>
//               <Image
//                 src="/assets/images/batman.webp"
//                 alt="avatar"
//                 width={50}
//                 height={50}
//               />
//               <p>{notification.message}</p>
//               <p>{new Date(notification.createdAt).toLocaleString()}</p>
//               <Button
//                 // onClick={async () =>
//                 //   await handlefollow({ mongoUserId1, results })
//                 // }
//                 className="btn-primary"
//               >
//                 Follow Back
//               </Button>
//             </div>
//           ))
//         ) : (
//           <p>No notifications found.</p>
//         )
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Notification;

"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { auth, useUser } from "@clerk/nextjs";
import { followUser, getUserById } from "@/lib/actions/user.action";
import Image from "next/image";
const Notification = ({ notification, mongoUserId1 }: any) => {
  return (
    <></>
    // <div
    //   className="flex justify-between my-4 w-full items-center"
    //   //   key={notification.id}
    // >
    //   hello
    //   {/* <Image
    //     src="/assets/images/batman.webp"
    //     alt="avatar"
    //     width={50}
    //     height={50}
    //   />
    //   <p>{notification.message}</p>
    //   <p>{new Date(notification.createdAt).toLocaleString()}</p>
    //   <Button
    //     onClick={async () =>
    //       await followUser({
    //         user1Id: mongoUserId,
    //         user2Id: notification.user1._id,
    //       })
    //     }
    //     className="btn-primary"
    //   >
    //     Follow Back
    //   </Button> */}
    // </div>
  );
};

export default Notification;
