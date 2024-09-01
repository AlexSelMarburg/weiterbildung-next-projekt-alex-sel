"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { shortenString } from "@/src/llib/helpers";

export default function LogIn() {
  const { data: session } = useSession();

  console.log(session);

  const isLoggedIn = session ? true : false;
  const name = shortenString(session?.user?.name ?? "", 10);

  return (
    <div className="log-in">
      {isLoggedIn ? (
        <>
          <button onClick={() => signOut()}>Sign out</button>
          {name && name.split("").splice(0, 10).join("")}
        </>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
}
