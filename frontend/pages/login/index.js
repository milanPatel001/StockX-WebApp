import React from "react";
import Link from "next/link";

function Login(props) {
  return (
    <React.Fragment>
      <div className="container h-screen">
        <div className="container h-full bg-white mx-auto w-3/4 relative">
          <div className="container bg-white w-9/12 h-3/4 mt-20 shadow-lg mx-auto rounded-xl border border-gray-400">
            <div className="flex flex-row h-full">
              <div className="basis-2/5 overflow-hidden">
                <img
                  className="h-full w-full rounded-xl"
                  src="/stock_bg.jpg"
                  alt="Stock market"
                ></img>
              </div>
              <div className="flex flex-col place-content-center w-full basis-3/5">
                <div className="mb-10 inline-block w-full text-center text-2xl font-serif">
                  StockX
                </div>
                <div className="inline-block text-center text-xl pb-10 font-mono">
                  Welcome to StockX
                </div>
                <div className="flex justify-center py-2 pb-7">
                  <input
                    className="border border-gray-400 shadow-xl w-3/4 h-8 p-5 rounded-lg"
                    placeholder="Username or Email"
                  />
                </div>
                <div className="flex justify-center py-2">
                  <input
                    className="w-3/4 p-5 h-8 rounded-lg shadow-xl border border-gray-400"
                    placeholder="Password"
                  />
                </div>
                <div className="flex justify-center pt-7">
                  <button className="font-semibold text-white rounded-xl cursor-pointer hover:bg-blue-400 z-40 bg-red-400 px-4 py-1 shadow-xl z-50">
                    Sign In
                  </button>
                </div>
                <div className="inline-block text-center text-lg mt-10 font-mono">
                  Don't have an account?
                  <div className="inline-block px-2 text-lg">
                    <Link href="/signup">
                      <a className="text-blue-800 hover:text-xl">
                        {" "}
                        Create New One{" "}
                      </a>
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
