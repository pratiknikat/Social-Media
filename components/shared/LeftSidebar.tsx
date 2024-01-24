"use client";

import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between gap-6 overflow-y-auto border-r p-6 pt-36 shadow-light-300 max-sm:hidden lg:w-[266px] dark:shadow-none"></section>
  );
};

export default LeftSidebar;
