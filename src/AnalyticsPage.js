import React, { useState, useEffect } from 'react';
import { fetchGuessCount } from './api'; // Adjust the path as needed
import './AnalyticsPage.css';
import LiveGraph from './LiveGraph'; // Ensure correct path
import GuessDistributionChart from './GuessDistributionChart'; // Ensure correct path

const AnalyticsDashboard = () => {
  const [selectedNumber, setSelectedNumber] = useState(1); // Default to 1 or any other number as needed
  const [submissions, setSubmissions] = useState(0); // Default to 1 or any other number as needed
  const [wins, setWins] = useState(0); // Default to 1 or any other number as needed

  // Increment the number
  const incrementNumber = () => {
    setSelectedNumber(prevNumber => prevNumber + 1);
  };

  // Decrement the number
  const decrementNumber = () => {
    setSelectedNumber(prevNumber => Math.max(prevNumber - 1, 1)); // Ensure number does not go below 1
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGuessCount(selectedNumber);
        console.log(result);
        // Convert parsedResult to an array of [key, value] pairs
        setSubmissions(result.submission_count);
        setWins(result.wins);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 15000); // Set up interval to fetch data every 15 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [selectedNumber]);

return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
        <h1>Live Analytics Dashboard</h1>
        <div className="number-selector">
            <span className="annotation">Select Connections Game Id</span>
            <button onClick={decrementNumber}>−</button>
            <input type="text" readOnly value={selectedNumber} />
            <button onClick={incrementNumber}>+</button>
        </div>
        <div className="stats-row">
            <p>Submissions: {submissions}</p>
            <p>Game Wins: {wins}</p>
            <p>Completion Rate: {(wins / submissions * 100).toFixed(2)}%</p>
        </div>
        <div className="chart-container" style={{ marginBottom: '40px' }}>
            <h2>Average Time to Solve Each Category</h2>
            <LiveGraph selectedNumber={selectedNumber} />
        </div>
        <div className="chart-container">
            <h2>Top 10 Most Common Guesses</h2>
            <GuessDistributionChart selectedNumber={selectedNumber} />
        </div>
    </div>
);
};

export default AnalyticsDashboard;