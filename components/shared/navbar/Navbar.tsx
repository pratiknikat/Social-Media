import { SignedIn, UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { userId } = auth();

  return (
    <nav className="flex-between bg-white fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1 max-sm:hidden ">
        <Image
          src="/assets/icons/logo.svg"
          width={30}
          height={30}
          alt="Instagram"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 max-sm:hidden ">
          <span className="text-primary-500 text-[25px]">Instagram</span>
        </p>
      </Link>
      <div className="lg:hidden md:hidden">
        <MobileNav />
      </div>
      <div className="flex-between gap-5">
        <div className="max-sm:hidden">
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
        <div className="lg:hidden">
          <Popover>
            <PopoverTrigger>
              <Image
                src="assets/icons/love.svg"
                alt="love"
                width={30}
                height={30}
              />
            </PopoverTrigger>
            <PopoverContent className="bg-white">
              Place content for the popover here.
            </PopoverContent>
          </Popover>
        </div>
        <div className="lg:hidden">
          <Image
            src="assets/icons/message.svg"
            alt="message"
            width={30}
            height={30}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
