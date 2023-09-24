import _ from "lodash";

const colors = [
  "bg-rose-600",
  "bg-rose-800",
  "bg-sky-500",
  "bg-green-700",
  "bg-green-400",
  "bg-fuchsia-700",
  "bg-fuchsia-900",
  "bg-indigo-500",
  "bg-green-600",
];

export function tickerBG() {
  let style =
    "inline-block text-center rounded-lg text-xs font-bold text-white px-2 pt-0.5 pb-1 ";
  style += _.sample(colors);
  return style;
}

export function pricesign(price) {
  let pricesign = "text-sm pr-2 sm:text-base font-bold ";
  pricesign += price < 0 ? "text-rose-700" : "text-green-700";
  return pricesign;
}

export function percentsign(percent) {
  let percentsign =
    "pr-0.5 pl-1 py-1 text-xs sm:text-base font-bold rounded-lg text-center ";
  percentsign +=
    percent > 0 ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-700";
  return percentsign;
}

export function cardPercentsign(percent) {
  let percentsign =
    "inline-block pr-2 pl-2 py-1 w-fit text-base font-bold rounded-lg text-center ";
  percentsign +=
    percent > 0 ? "bg-green-100 text-green-800" : "bg-rose-100 text-rose-700";
  return percentsign;
}

export function cardTickerBG() {
  let style =
    "inline-block w-fit ml-1 text-xs text-center rounded-lg font-bold text-white px-2 mt-1 py-0.5 ";
  style += _.sample(colors);
  return style;
}

export function searchTickerBG() {
  const tickers = [];
  let style;
  for (let i = 0; i < 6; i++) {
    style =
      "inline-block w-fit ml-1 text-xs text-center rounded-lg font-bold text-white px-2 mt-1 py-0.5 ";
    style += _.sample(colors);

    tickers.push(style);
  }

  return tickers;
}

export function abbreviateNumber(number) {
  const SYMBOL = ["M", "B", "T"];

  // Ensure the input is a number
  if (isNaN(number)) return "Invalid input";

  // Determine the order of magnitude (K, M, B, T)
  const order = Math.floor(Math.log10(Math.abs(number)) / 3);

  // Calculate the abbreviated number
  const scaledNumber = number / Math.pow(10, order * 3);

  // Format the number with a fixed number of decimal places
  const formattedNumber = scaledNumber.toFixed(2);

  // Append the SI symbol for the order of magnitude
  return formattedNumber + SYMBOL[order];
}
