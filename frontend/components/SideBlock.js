"use client";

import { useState } from "react";

function SideBlock(props) {
  return (
    <div className="flex flex-col h-full w-full gap-4 p-4 divide-y divide-gray border border-gray-400 rounded-lg">
      <div className="flex flex-row pt-2">
        <div className="font-semibold text-sm pr-2 text-gray-600">
          PRIMARY EXCHANGE
        </div>
        <div className="container text-end text-lg pr-5 font-semibold">
          {props?.stockData?.quote.fullExchangeName}
        </div>
      </div>
      <div className="flex flex-row pt-2">
        <div className="font-semibold pr-2 text-gray-600 font-mono">
          MARKET CAP
        </div>
        <div className="container text-end text-lg pr-5 font-semibold">
          ${props?.stockData?.quote.marketCap}
        </div>
      </div>
      <div className="flex flex-row pt-2">
        <div className="font-semibold pr-2 text-lg text-gray-600 font-mono">
          52 WEEK RANGE
        </div>
        <div className="container text-end text-lg pr-5 font-semibold">
          ${props?.stockData?.quote.fiftyTwoWeekRange}
        </div>
      </div>
      <div className="flex flex-row pt-2">
        <div className="font-semibold pr-2 text-gray-600 font-mono">
          CURRENCY
        </div>
        <div className="container text-end pr-5 text-lg font-semibold">
          {props?.stockData?.quote.currency}
        </div>
      </div>
      <div className="flex flex-row pt-2">
        <div className="font-semibold pr-2 text-gray-600 font-mono">
          P/E RATIO
        </div>
        <div className="container text-end pr-5 text-lg font-semibold">
          {props?.stockData?.quote.forwardPE}
        </div>
      </div>
      <div className="flex flex-row pt-2">
        <div className="font-semibold pr-2 text-gray-600 font-mono">
          TRAILING P/E
        </div>
        <div className="container text-end pr-5 text-lg font-semibold">
          {props?.stockData?.quote.trailingPE}
        </div>
      </div>
      <div className="flex flex-row pt-2">
        <div className="font-semibold pr-2 text-gray-600 font-mono">
          TRAILING ANNUAL DIVIDEND RATE
        </div>
        <div className="container text-end pr-5 text-lg font-semibold">
          {props?.stockData?.quote.trailingAnnualDividendRate}
        </div>
      </div>
      <div className="flex flex-row pt-2">
        <div className="font-semibold pr-2 text-gray-600 font-mono">
          DAY RANGE
        </div>
        <div className="container text-end pr-5 text-lg font-semibold">
          ${props?.stockData?.quote.regularMarketDayRange}
        </div>
      </div>
    </div>
  );
}

export default SideBlock;
