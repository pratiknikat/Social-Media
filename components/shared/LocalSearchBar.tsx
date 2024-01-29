"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const LocalSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);
  return (
    <div
      style={{ borderRadius: "10px" }}
      className="relative w-full mt-4 bg-[#F4F6F8] rounded-md items-center max-w-[600px]"
      ref={searchContainerRef}
    >
      <div className="relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search1.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder=" Search "
          className="no-focus placeholder border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default LocalSearchBar;
