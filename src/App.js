import React, { useState } from 'react';
import './App.css';

function App() {
  const [pfBalance, setPfBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyContributions, setMonthlyContributions] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const calculatePF = () => {
    setLoading(true); // show loading indicator 
    const principal = parseFloat(pfBalance);
    const rate = parseFloat(interestRate) / 100;
    const contributions = parseFloat(monthlyContributions);
    const period = parseInt(months, 10);

    const compoundsPerYear = 12;
    const timeInYears = period / 12;
    const interestRatePerPeriod = rate / compoundsPerYear;
    if (isNaN(principal) || isNaN(rate) || isNaN(contributions) || isNaN(period)) {
      setResult('Please enter valid numbers for all fields.');
      return;
    }

    const amountAfterMonths = principal * Math.pow(1 + interestRatePerPeriod, compoundsPerYear * timeInYears);
    const totalContributions = contributions * period;
    const finalBalance = amountAfterMonths + totalContributions;


    setResult(`Lump sum after ${months} months: ${finalBalance.toFixed(2)} Rs`);
    setLoading(false); // hide loading indicator

  };

  return (
    <div className='App'>
      <div className="loader" >
      <h1>PF Calculator</h1>
      <label>
        PF Balance (Rs):
        <input type="number" value={pfBalance} onChange={(e) => setPfBalance(e.target.value)} />
        <br />
      </label>

      <label>
        Interest Rate (%):
        <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
        <br />
      </label>

      <label>
        Monthly Contributions (Rs):
        <input type="number" value={monthlyContributions} onChange={(e) => setMonthlyContributions(e.target.value)} />
        <br />
      </label>
<div className='doo'>
      <label>
        Months:
        <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
        <br />
      </label>
</div>
<br/>

      <button onClick={calculatePF}>Calculate</button>

      <p id="result">{result}</p>
      </div>
    </div>
  );
}

export default App;
