import React from "react";
import { Button } from "./button";
import SignInButton from "../landing/SignInButton";

function Navbar() {
  return (
    <nav className=" grid grid-cols-2 lg:grid-cols-3 items-center mt-4 border-b border-gray-200 h-14  px-4 lg:px-8">
      <div className="text-3xl font-semibold font-zain cursor-pointer">Remotix</div>
      
      <div className="hidden lg:flex gap-6 justify-center items-center">
        <div className="cursor-pointer transition-colors">Home</div>
        <div className="cursor-pointer transition-colors">About</div>
        <div className="cursor-pointer transition-colors">Pricing</div>
      </div>
      
      <div className="flex justify-end items-center">
        <div className="md:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 cursor-pointer"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M20 7L4 7"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M20 12L4 12"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
              <path
                d="M20 17L4 17"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </g>
          </svg>
        </div>
        <div className="hidden md:block">
          <SignInButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
