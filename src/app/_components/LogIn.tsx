"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { shortenString } from "@/lib/helpers";

export default function LogIn() {
  const { data: session } = useSession();

  console.log(session);

  const isLoggedIn = session ? true : false;
  const name = shortenString(session?.user?.name?.trim() ?? "", 10);

  return (
    <div className="log-in">
      {isLoggedIn ? (
        <>
          <button
            className="button"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
          {name && <p className="user-name">{name}</p>}
        </>
      ) : (
        <>
          <button className="button" onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
    </div>
  );
}
