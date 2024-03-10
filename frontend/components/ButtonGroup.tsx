const buttonStyle =
  "py-1 px-4 text-sm font-medium text-gray-900 focus:text-blue-600 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:bg-blue-100 focus:z-10 focus:ring-1 focus:ring-gray-200";

export default function ButtonGroup() {
  return (
    <div className="flex flex-row pt-1.5 pb-4 pl-2 gap-2">
      <button className={buttonStyle}>Actives</button>
      <button className={buttonStyle}>Gainers</button>
      <button className={buttonStyle}>Losers</button>
    </div>
  );
}
