import { useEffect, useState } from "react";
import { Chart as Chartjs, PointElement } from "chart.js/auto";
import { Doughnut  } from "react-chartjs-2";

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

function ChartDoughnut() {
  const [chartDemo, setChart] = useState<TypeChart>(chartData);

  useEffect(() => {
    const data = [120, 250];
    const backgroundColors = [
      'rgb(255, 138, 72)', //Cam
      'rgb(54, 162, 235)', // Blue 
    ];

    setChart({
      datasets: [
        {
          data,
          hoverOffset: 4,
          backgroundColor: backgroundColors,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    height: 190,
    width: 190,
  };

  return <Doughnut data={chartDemo} options={options} />;
}

export default ChartDoughnut;
