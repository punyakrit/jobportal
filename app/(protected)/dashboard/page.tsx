import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import React from "react";

async function page() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-validate`,
    { id: user?.id }
  );
  console.log(response);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.user_metadata.name}</p>
    </div>
  );
}

export default page;
