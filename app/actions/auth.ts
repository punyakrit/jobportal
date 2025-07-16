'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers';
import { redirect } from "next/navigation";

export async function oAuth(){
    const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `localhost:3000/auth/callback`,
    },
  });

  if (error) {
    return redirect('/signin?message=Could not redirect in OAuth');
  }
  console.log(data)
  revalidatePath("/dashboard");
  return redirect(data.url);
  
}

export async function signOut(){
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
} 