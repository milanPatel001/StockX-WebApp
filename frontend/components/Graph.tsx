"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { graphDataConverter } from "../utils/stockService";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import { set } from "lodash";
import { GraphProps } from "@/backend";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

function Graph({ graphData }: GraphProps) {
  const [chartOptions, setChartOptions] = useState<any>({});
  const [data, setData] = useState({
    labels: ["ho", "jo"],
    datasets: [
      {
        data: [2, 3],
      },
    ],
  });

  useEffect(() => {
    let label = [];
    let dataset = [];

    if (graphData) {
      for (const [key, value] of Object.entries(graphData)) {
        const result = graphDataConverter(key, value);

        label.push(result.date);
        dataset.push(value.close);
      }

      label = label.slice(label.length - 50, label.length);
      dataset = dataset.slice(dataset.length - 50, dataset.length);

      const data = {
        labels: label,
        datasets: [
          {
            data: dataset,
          },
        ],
      };

      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx: CanvasRenderingContext2D | null = canvas?.getContext("2d");

      const gradient = ctx?.createLinearGradient(0, 0, 0, 400);

      if (gradient) {
        gradient.addColorStop(0.03, "rgba(81,179,45,1)");
        gradient.addColorStop(0.29, "rgba(138,238,101,0.14)");
        gradient.addColorStop(0.39, "rgba(138,238,101,0.09)");
        gradient.addColorStop(0.9, "rgba(138,238,101,0)");
      }
      const options = {
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          line: {
            tension: 0,
            borderWidth: 2,
            fill: "start",
            borderColor: "rgba(27,149,85,1)",
            backgroundColor: gradient,
          },
          point: {
            radius: 2,
            hitRadius: 6,
          },
        },
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 6,
            },
          },
        },
      };

      const chartOption = {
        options: options,
      };
      setData(data);
      setChartOptions(chartOption);
    }
  }, [graphData]);

  return (
    <Line
      id="canvas"
      data={data}
      width={350}
      height={150}
      options={chartOptions.options}
    />
  );
}

export default Graph;
