import { useRouter } from "next/router";

function Navbar(props) {
  const router = useRouter();

  return (
    <header className="flex items-center drop-shadow-xl sticky top-0 z-50 p-2 mx-auto bg-white">
      <div className="flex items-center basis-5/7">
        <h2
          className="text-2xl md:text-3xl p-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          STOCKX
        </h2>
        <p
          onClick={() => router.push("/")}
          className="text-xl p-2 pl-6 hover:scale-125 transition cursor-pointer"
        >
          HOME
        </p>
      </div>

      <div className="flex basis-2/7 justify-items-end items-center">
        <p
          onClick={() => router.push("/signup")}
          className="text-md md:text-xl p-2 pt-3 hover:scale-125 transition cursor-pointer"
        >
          Sign Up
        </p>
        <p
          onClick={() => router.push("/login")}
          className="text-md md:text-xl p-2 pt-3 hover:scale-125 transition cursor-pointer"
        >
          Log In
        </p>
      </div>
    </header>
  );
}

export default Navbar;
