"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { registerUser } from "../../utils/userService";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  //   const [error, setError] = useState();
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSignUp = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    // console.log(data.get("fullname"));

    try {
      await registerUser({
        fullname,
        email,
        password,
      });

      router.push("/login");
    } catch (err) {
      toast.error("Something went wrong!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="w-screen h-screen lg:bg-gray-100">
      <ToastContainer />
      <div className="border"></div>
      <div className="lg:w-1/3 mx-auto rounded-xl lg:shadow-xl p-10 bg-white lg:mt-7 flex flex-col">
        <div className="mt-3 flex items-center gap-3">
          <img
            width={100}
            height={100}
            src="https://api.dicebear.com/6.x/big-smile/svg?seed=happy"
            alt="avt"
            loading="lazy"
          />
          <p className="text-5xl font-serif">Welcome to FundX</p>
        </div>

        <div className="flex gap-2 items-center mt-10">
          <LockClosedIcon className="w-6 h-6" />
          <p className="text-3xl font-serif">Sign Up</p>
        </div>

        <p className="text-sm text-gray-400 mt-2">Please enter your details.</p>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4 mt-6">
          <div className="relative">
            <input
              name="fullname"
              type="text"
              value={fullname}
              id="floating_outlined"
              className="block border border-gray-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setFullname(e.currentTarget.value)}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Full Name
            </label>
          </div>

          <div className="relative">
            <input
              name="email"
              type="text"
              value={email}
              id="floating_outlined"
              className="block border border-gray-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              name="password"
              type="text"
              value={password}
              id="floating_outlined2"
              className="block border border-gray-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <label
              htmlFor="floating_outlined2"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 peer-focus: rounded-xl"
            >
              Password
            </label>
          </div>

          <button
            className="p-3 px-6 bg-yellow-300 rounded-xl w-1/3 mx-auto mt-4 font-medium hover:bg-yellow-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="inline-block text-center text-lg pb-7 mx-auto mt-8">
          Already a user?
          <div className="inline-block px-2 text-lg">
            <Link href="/login" className="text-blue-800 hover:text-xl">
              {" "}
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
