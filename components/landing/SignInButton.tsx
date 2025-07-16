"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { oAuth, signOut } from "@/app/actions/auth";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function SignInButton() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        className="rounded-3xl cursor-pointer"
        onClick={async () => {
          if (!user) {
            await oAuth();
          } else {
            router.push("/dashboard");
          }
        }}
      >
        {user ? "Dashboard" : "Sign In"}
      </Button>
      <Avatar>
        <AvatarImage src={user?.user_metadata.avatar_url} className="rounded-full h-8 w-8" />
        <AvatarFallback className="rounded-full h-8 w-8">{user?.user_metadata.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default SignInButton;
