import React, { useState } from "react";
import Link from "next/link";

function Login(props) {
  const [error, setError] = useState();
  return (
    <React.Fragment>
      <div className="container h-screen">
        <div className="container h-full bg-white mx-auto w-3/4 relative">
          <div className="container bg-white w-8/12 h-fit mt-20 shadow-lg mx-auto rounded-xl border border-gray-400">
            <div className="flex flex-row h-full">
              <div className="flex flex-col place-content-center w-full">
                <div className="inline-block text-center text-3xl pt-7 pb-10 font-mono">
                  Welcome to StockX
                </div>
                <div className="inline-block text-center text-xl pb-3 font-mono">
                  Create Account
                </div>
                <form>
                  <div className="grid justify-items-center my-2 py-2">
                    <span className="block mr-80 text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Name
                    </span>
                    <input
                      type="text"
                      className="peer mt-1 justify-self-center px-3 py-2 bg-white border shadow-lg border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-1/2 rounded-md sm:text-sm focus:ring-1"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid justify-items-center my-2 py-2">
                    <span className="block mr-80 text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Email
                    </span>
                    <input
                      type="email"
                      className="peer mt-1 justify-self-center px-3 py-2 bg-white border shadow-lg border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-1/2 rounded-md sm:text-sm focus:ring-1"
                      placeholder="you@example.com"
                    />
                    {error && (
                      <p className="mt-2 peer-invalid:visible text-pink-600 text-sm">
                        Please provide a valid email address.
                      </p>
                    )}
                  </div>

                  <div className="grid justify-items-center mt-2 py-2">
                    <span className="block mr-72 text-sm font-medium text-slate-700 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Password
                    </span>
                    <input
                      type="text"
                      className="peer mt-1 justify-self-center px-3 py-2 bg-white border shadow-lg border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-1/2 rounded-md sm:text-sm focus:ring-1"
                      placeholder="xyz..."
                    />
                  </div>
                </form>
                <div className="flex justify-center py-7">
                  <button className="font-semibold text-white text-lg rounded-3xl cursor-pointer transition duration-300 ease-in-out hover:bg-red-500 z-40 bg-red-400 px-6 py-2 shadow-xl z-50">
                    Sign Up
                  </button>
                </div>
                <div className="inline-block text-center text-lg pb-7">
                  Already a user?
                  <div className="inline-block px-2 text-lg">
                    <Link href="/login">
                      <a className="text-blue-800 hover:text-xl"> Log in </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
