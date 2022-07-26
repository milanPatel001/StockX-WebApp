import _ from "lodash";
import { useRouter } from "next/router";

function StockCardMini(props) {
  const data = {
    percent: "-30",
    price: "$20.2",
    symbol: "APP",
    name: "Demo_Stock INC.",
  };

  const router = useRouter();

  function percentsign(percent) {
    let percentsign = "pl-4 text-m ";
    percentsign += percent > 0 ? "text-green-800" : "text-rose-700";
    return percentsign;
  }

  function tickerBG() {
    const colors = [
      "bg-rose-600",
      "bg-rose-800",
      "bg-sky-500",
      "bg-green-700",
      "bg-green-500",
      "bg-fuchsia-700",
      "bg-fuchsia-900",
      "bg-indigo-500",
      "bg-green-600",
    ];

    let style =
      "inline-block ml-4 text-xs text-center rounded-lg font-bold text-white px-1 mt-1 py-0.5 ";
    style += _.sample(colors);
    return style;
  }

  return (
    <div
      className="flex flex-col border-2 border-slate-300 gap-1 h-16 w-52 py-1 px-1 rounded-xl bg-white hover:bg-gray-100 cursor-pointer"
      onClick={() => router.push("/home/" + data.symbol)}
    >
      <div className="flex flex-row h-6">
        <div className={tickerBG()}>{data.symbol}</div>
        <div className="text-sm font-bold pl-2 pt-0.5">{data.name}</div>
      </div>

      <div className="flex flex-row h-4">
        <div className={percentsign(data.percent)}>{data.percent}%</div>
        <div className="font-bold text-m pl-8">{data.price}</div>
      </div>
    </div>
  );
}

export default StockCardMini;
