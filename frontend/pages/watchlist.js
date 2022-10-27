import { getAllWatchedStocks } from "../utils/userService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import WatchlistDisplay from "../components/WatchlistDisplay";
import Navbar from "../components/NavBar";
import Searchbar from "../components/SearchBar";
import { useEffect, useState } from "react";
import StockCardMini from "../components/stockcard_mini";

function WatchList() {
  const [userLoggedIn] = useAuthState(auth);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllWatchedStocks(userLoggedIn.uid);
      console.log(data);
      setStocks(data);
    };
    getData();
  }, []);

  if (stocks?.length === 0) return <p>Seems empty</p>;

  return (
    <div className="h-screen mx-auto">
      <div>
        <WatchlistDisplay stocks={stocks} />
      </div>
    </div>
  );
}

export default WatchList;

/*
 <Navbar />

      <div className="flex flex-row h-auto p-2 py-4 gap-7 justify-center">
        <StockCardMini />
        <StockCardMini />

        <div className="hidden md:inline-flex">
          <StockCardMini />
        </div>

        <div className="hidden lg:inline-flex">
          <StockCardMini />
        </div>

        <div className="hidden xl:inline-flex">
          <StockCardMini />
        </div>
      </div>

      <div className="relative p-4 max-w-2xl mx-auto">
        <Searchbar />
      </div>
*/
