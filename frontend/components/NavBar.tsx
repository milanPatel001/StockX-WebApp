"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { HomeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const [userLoggedIn] = useAuthState(auth);

  const handleSignOut = (): void => {
    signOut(auth)
      .then(() => {
        toast.success("Signed Out Successfully!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Can't sign out!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <header className="flex items-center drop-shadow-xl sticky top-0 z-50 p-2 bg-white">
      <div className="flex items-center w-1/3 pl-2">
        <h2
          className="text-2xl md:text-3xl cursor-pointer"
          //onClick={() => router.push("/")}
        >
          <Link href={"/"}>StockX</Link>
        </h2>
        <Link href={"/"}>
          <div
            //onClick={() => router.push("/")}
            className="flex gap-1 items-center md:text-xl pl-6 hover:scale-125 transition cursor-pointer"
          >
            <HomeIcon className="w-6 h-6" />
            <span>HOME</span>
          </div>
        </Link>
      </div>

      {userLoggedIn ? (
        <div className="flex gap-2 w-2/3 justify-end items-center">
          <Link href="/watchlist">
            <div
              className="text-md items-center flex gap-1 md:text-2xl p-2 pt-3 hover:scale-125 transition cursor-pointer"
              //onClick={() => router.push("/watchlist")}
            >
              <ClockIcon className="h-8 w-8" />
              <span>WatchList</span>
            </div>
          </Link>
          <div className="hidden md:inline-flex text-md md:text-2xl p-2 pt-3">
            {userLoggedIn.displayName}
          </div>
          <div
            className="text-md md:text-2xl p-2 pt-3 hover:scale-125 transition hover:text-red-500 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </div>
        </div>
      ) : (
        <div className="flex w-4/5 justify-end items-center">
          <p
            //onClick={() => router.push("/signup")}
            className="text-md md:text-xl p-2 hover:scale-125 transition cursor-pointer"
          >
            <Link href={"/signup"}>Sign Up</Link>
          </p>
          <p
            //onClick={() => router.push("/login")}
            className="text-md md:text-xl p-2 hover:scale-125 transition cursor-pointer"
          >
            <Link href={"/login"}>Log In</Link>
          </p>
        </div>
      )}
    </header>
  );
}

export default Navbar;
