"use client";
import React from "react";
import { Button } from "./components/ui/button";
import { followUser } from "./lib/actions/user.action";

const Followbackbtn = ({ mongoUserId, user1 }: any) => {
  //   console.log(mongoUserId);
  return (
    <div>
      <Button
        onClick={async () =>
          await followUser({
            user1Id: user1,
            user2Id: mongoUserId,
          })
        }
        className="btn-primary"
      >
        Follow Back
      </Button>
    </div>
  );
};

export default Followbackbtn;
