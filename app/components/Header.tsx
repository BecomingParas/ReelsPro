"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {}
  };
  return (
    <div className="navbar bg-base-300 sticky top-0 z-40">
      <div className=" container mx-auto">
        <div className="flex-1 px-2 lg:flex-none"></div>
      </div>
      <button onClick={handleSignout}>Signout</button>
      {session ? (
        <div>welcome</div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
