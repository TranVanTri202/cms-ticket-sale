import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

const LineChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    // Đăng ký các plugin cần thiết
    Chart.register(...registerables);

    // Dữ liệu mẫu cho biểu đồ
    const data = {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
      datasets: [
        {
          label: 'Doanh thu',
          data: [500, 800, 600, 900, 700, 1000],
          borderColor: 'orange',
          backgroundColor: 'transparent',
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };

    if (chartRef.current) {
      // Hủy bỏ biểu đồ hiện tại nếu tồn tại
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Tạo biểu đồ mới
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            elements: {
              line: {
                tension: 0.4,
                borderWidth: 2,
              },
            },
          },
        });
      }
    }
  }, []);

  return <canvas ref={chartRef} style={{ height: '50%' }} />;
};

export default LineChart;
