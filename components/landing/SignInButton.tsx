"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { oAuth, signOut } from "@/app/actions/auth";
import { useUser } from "@/context/user";
import { useRouter } from "next/navigation";

function SignInButton() {
  const { user } = useUser();
  const router = useRouter();
  return (
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
  );
}

export default SignInButton;
