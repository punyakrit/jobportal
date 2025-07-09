import React from "react";
import { Button } from "./button";
import SignInButton from "../landing/SignInButton";

function Navbar() {
  return (
    <nav className="container mx-auto flex justify-between items-center mt-4 border-b border-gray-200 h-14 px-2">
      <div className="text-3xl font-semibold font-zain">Remotix</div>
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M20 7L4 7"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M20 12L4 12"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
              <path
                d="M20 17L4 17"
                stroke="#1C274C"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className="hidden md:flex">
          <SignInButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
