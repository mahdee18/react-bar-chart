import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Bars } from 'react-loader-spinner';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://django-dev.aakscience.com/candidate_test/fronted', {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        parseData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    const parseData = (data) => {
      const labels = [];
      const values = [];

      data[0]['2024'].forEach((month) => {
        Object.values(month).forEach((dates) => {
          dates.forEach((entry) => {
            const [date, value] = Object.entries(entry)[0];
            labels.push(date.split(',')[0]);
            values.push(value);
          });
        });
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Values',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData.labels ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Data Load From API',
              },
            },
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Bars
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
          <p>Loading data, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default BarChart;
