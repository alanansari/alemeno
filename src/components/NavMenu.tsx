"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-slate-900 mb-5 p-2 flex justify-end">
        <Image
          src={session?.user?.image || ""}
          className="rounded-[60%] mr-2"
          alt="Profile Picture"
          width={40}
          height={40}
        />
        <div className="w-fit flex items-center">{session?.user?.name}</div>
        <button
          className="border-2 rounded p-2 mx-[5vw]"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className="bg-slate-900 mb-5 p-2 flex justify-end">
        <div className="w-fit flex items-center">Not signed in</div>
        <button className="border-2 rounded p-2 mx-10" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    );
  }
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
