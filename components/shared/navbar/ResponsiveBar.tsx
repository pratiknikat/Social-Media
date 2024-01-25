"use client";
import React from "react";
import Image from "next/image";
import { mobileSidebarLinks, sidebarLinks } from "@/constant";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
const ResponsiveBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <div
      style={{
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        height: "70px",
      }}
      className="bg-white lg:hidden  absolute z-50 bottom-0 left-0 right-0 flex justify-between px-5 border-t-2 p-1"
    >
      {mobileSidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        if (item.route === "/profile") {
          if (userId) {
            item.route = `${item.route}/${userId}`;
          } else {
            return null;
          }
        }
        return (
          <Link
            key={item.route}
            href={item.route}
            className={`${
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900"
            } flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={27}
              height={27}
              className={`${isActive ? "" : "invert-colors"}`}
            />
            <p
              className={`${
                isActive ? "base-bold" : "base-medium"
              } max-lg:hidden`}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ResponsiveBar;
