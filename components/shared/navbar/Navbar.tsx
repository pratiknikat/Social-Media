import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between bg-white fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <p className="h2-bold font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">
          <span className="text-primary-500">Instagram</span>
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
