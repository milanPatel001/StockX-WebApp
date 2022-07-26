function Navbar(props) {
  return (
    <div className="flex flex-row drop-shadow-xl sticky top-0 z-50 p-2 mx-auto bg-white text-lg">
      <div className="flex flex-row items-center basis-6/7">
        <div className="text-3xl p-2">STOCKX</div>
        <div className="text-xl p-2 pl-6">HOME</div>
      </div>

      <div className="flex flex-row basis-1/7">
        <div className="text-xl p-2 pt-3">Sign Up</div>
        <div className="text-xl p-2 pt-3">Log In</div>
      </div>
    </div>
  );
}

export default Navbar;
