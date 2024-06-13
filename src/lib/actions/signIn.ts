// import { signIn } from "next-auth/react";

export const signIn = async (email: string, password: string) => {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 200) {
    return true;
  }

  return false;
};
