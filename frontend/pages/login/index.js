import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { loginUserUsingId, verifyToken } from "../../utils/userService";
import { useRouter } from "next/router";

function Login(props) {
  const router = useRouter();

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        loginUserUsingId(result.user.uid);
        router.push("/");
      })
      .catch(alert);
  };

  const handleLoginUsingEmail = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        result.user.getIdToken(true).then((idtoken) => {
          verifyToken(idtoken);
        });
      })
      .catch((err) => console.log(err));

    router.push("/");
  };

  return (
    <React.Fragment>
      <div className="h-screen">
        <div className="h-full bg-white mx-auto lg:w-3/4 relative">
          <div className="bg-white lg:w-9/12 h-full lg:h-3/4 lg:mt-20 shadow-lg mx-auto rounded-xl border border-gray-400">
            <div className="flex h-full">
              <div className="relative lg:basis-2/5 overflow-hidden hidden lg:inline-flex">
                <Image
                  objectFit="contain"
                  layout="fill"
                  className="h-full w-full rounded-xl"
                  src="/stock_bg.jpg"
                  alt="Stock market"
                />
              </div>
              <div className="flex flex-col place-content-center w-full lg:basis-3/5">
                <div className="mb-10 inline-block w-full text-center text-2xl font-serif">
                  StockX
                </div>
                <div className="inline-block text-center text-xl pb-10 font-mono">
                  Welcome to StockX
                </div>

                <form onSubmit={handleLoginUsingEmail}>
                  <div className="flex justify-center py-2 pb-7">
                    <input
                      name="email"
                      className="border border-gray-400 shadow-xl w-3/4 h-8 p-5 rounded-lg"
                      placeholder="Username or Email"
                    />
                  </div>
                  <div className="flex justify-center py-2">
                    <input
                      name="password"
                      className="w-3/4 p-5 h-8 rounded-lg shadow-xl border border-gray-400"
                      placeholder="Password"
                    />
                  </div>
                  <div className="flex justify-center pt-7">
                    <button
                      type="submit"
                      className="font-semibold text-white rounded-xl cursor-pointer hover:bg-red-500 transition duration-200 ease-out hover:scale-105 bg-red-400 px-4 py-1 shadow-xl z-40"
                    >
                      Sign In
                    </button>
                  </div>
                </form>

                <div className="h-10 w-10 bg-gray-100 flex rounded-full justify-center mx-auto">
                  <div
                    className="h-8 w-8 relative mx-auto my-auto cursor-pointer"
                    onClick={handleLogin}
                  >
                    <Image
                      className="active:scale-90"
                      objectFit="contain"
                      layout="fill"
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965278.png"
                      alt=""
                    />
                  </div>
                </div>

                <div className="inline-block text-center text-lg mt-10 font-mono">
                  Don't have an account?
                  <div className="inline-block px-2 text-lg transition">
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
