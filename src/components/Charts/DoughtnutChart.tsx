import React, { useEffect, useState } from "react";
import { Chart as Chartjs, PointElement } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

Chartjs.register(PointElement);

interface DataSets {
  data: number[];
  hoverOffset: number;
  backgroundColor: string[];
}

interface TypeChart {
  datasets: DataSets[];
}

const chartData: TypeChart = {
  datasets: [
    {
      data: [],
      hoverOffset: 0,
      backgroundColor: [],
    },
  ],
};

interface valueTicket {
  vedasudung: number | null;
  vechuasudung: number | null;
}

const ChartDoughnut: React.FC<valueTicket> = ({ vedasudung, vechuasudung }) => {
  const [chartDemo, setChart] = useState<TypeChart>(chartData);

  useEffect(() => {
    const data = [vedasudung, vechuasudung].filter((value) => value !== null) as number[];
    const backgroundColors = ["rgb(255, 138, 72)", "rgb(54, 162, 235)"];

    setChart({
      datasets: [
        {
          data,
          hoverOffset: 4,
          backgroundColor: backgroundColors,
        },
      ],
    });
  }, [vedasudung, vechuasudung]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    height: 190,
    width: 190,
  };

  return <Doughnut data={chartDemo} options={options} />;
};

export default ChartDoughnut;
