'use client';

import Image from "next/image";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="font-semibold text-xl">AI สำหรับอสังหาฯ โดยอาจารย์นิว</span>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Sign up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 