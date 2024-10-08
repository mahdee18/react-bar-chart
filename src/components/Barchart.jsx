import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

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
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Bar Chart Component</h1>
    </div>
  );
};

export default BarChart;
