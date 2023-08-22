"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar(props) {
  const router = useRouter();
  const [userLoggedIn] = useAuthState(auth);

  const handleSignOut = () => {
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
    <header className="flex items-center drop-shadow-xl sticky top-0 z-50 p-2 mx-auto bg-white">
      <ToastContainer />
      <div className="flex items-center">
        <h2
          className="text-2xl md:text-3xl p-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          StockX
        </h2>
        <div
          onClick={() => router.push("/")}
          className="flex gap-1 text-xl pl-6 hover:scale-125 transition cursor-pointer"
        >
          <HomeIcon className="w-6 h-6" />
          <span>HOME</span>
        </div>
      </div>

      {userLoggedIn ? (
        <div className="flex justify-items-end items-center">
          <div
            className="text-md md:text-2xl p-2 pt-3 hover:scale-125 transition cursor-pointer"
            onClick={handleSignOut}
          >
            {userLoggedIn.displayName}
          </div>
          <div
            className="text-md md:text-xl p-2 pt-3 hover:scale-125 transition cursor-pointer"
            onClick={() => router.push("/watchlist")}
          >
            WatchList
          </div>
        </div>
      ) : (
        <div className="flex w-4/5 justify-end items-center">
          <p
            onClick={() => router.push("/signup")}
            className="text-md md:text-xl p-2 hover:scale-125 transition cursor-pointer"
          >
            Sign Up
          </p>
          <p
            onClick={() => router.push("/login")}
            className="text-md md:text-xl p-2 hover:scale-125 transition cursor-pointer"
          >
            Log In
          </p>
        </div>
      )}
    </header>
  );
}

export default Navbar;
