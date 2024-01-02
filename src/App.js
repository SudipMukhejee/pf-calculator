import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './App.css';

function App() {
  const [pfBalance, setPfBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyContributions, setMonthlyContributions] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    // Load the chart on component mount
    loadChart();
  }, []);

  const calculatePF = () => {
    const principal = parseFloat(pfBalance);
    const rate = parseFloat(interestRate) / 100;
    const contributions = parseFloat(monthlyContributions);
    const period = parseInt(months, 10);

    const compoundsPerYear = 12;
    const timeInYears = period / 12;
    const interestRatePerPeriod = rate / compoundsPerYear;

    const amountAfterMonths = principal * Math.pow(1 + interestRatePerPeriod, compoundsPerYear * timeInYears);
    const totalContributions = contributions * period;
    const finalBalance = amountAfterMonths + totalContributions;

    setResult(`Lump sum after ${months} months: ${finalBalance.toFixed(2)} Rs`);

    // Update the chart with new data
    updateChart(finalBalance);
  };

  const loadChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'PF Balance over Time',
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          borderColor: 'rgba(0, 0, 255, 1)',
          data: [],
        }],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'PF Balance',
            },
          },
        },
      },
    });
  };

  const updateChart = (newData) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...Array(parseInt(months)).keys()].map((month) => month + 1),
        datasets: [{
          label: 'PF Balance over Time',
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          borderColor: 'rgba(0, 0, 255, 1)',
          data: [...Array(parseInt(months)).keys()].map(() => newData),
        }],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'PF Balance',
            },
          },
        },
      },
    });
  };

  return (
    <div className="App">
      <h1>PF Calculator</h1>
      {/* ... (input fields) */}
      <button onClick={calculatePF}>Calculate</button>

      <p id="result">{result}</p>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
}

export default App;
