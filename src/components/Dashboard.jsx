

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const url = "https://api.sheetbest.com/sheets/66931299-448d-4d0c-b535-7eeac70e1c3d";

    axios
      .get(url)
      .then((response) => {
        const sheetData = response.data;

        if (sheetData && sheetData.length > 0) {
          const aggregatedData = {};

          sheetData.forEach((row) => {
            const day = row.Day;
            const values = {
              A: parseInt(row.A, 10) || 0,
              B: parseInt(row.B, 10) || 0,
              C: parseInt(row.C, 10) || 0,
              D: parseInt(row.D, 10) || 0,
              E: parseInt(row.E, 10) || 0,
              F: parseInt(row.F, 10) || 0,
            };

            if (!aggregatedData[day]) {
              aggregatedData[day] = [];
            }
            aggregatedData[day].push(values);
          });

          const formattedData = Object.keys(aggregatedData).map((day) => {
            const values = aggregatedData[day];

            const topValues = {
              day,
              A: values.map((v) => v.A).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0),
              B: values.map((v) => v.B).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0),
              C: values.map((v) => v.C).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0),
              D: values.map((v) => v.D).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0),
              E: values.map((v) => v.E).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0),
              F: values.map((v) => v.F).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0),
            };
            return topValues;
          });

          setData(formattedData);
          setLoading(false);
        } else {
          setError("No data available in the sheet.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching sheet data", error);
        setError("Error fetching data.");
        setLoading(false);
      });
  }, []);

  const handleBarClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const lineChartData = data.map((entry) => ({
    day: entry.day,
    value: entry[selectedLetter] || 0,
  }));

  return (
    <div className={`dashboard ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <header className="dashboard-header">
            <h1
         style={{
          justifyContent: "center",
           textAlign: "center",
          color: isDarkMode ? "#ffffff" : "#000000", 
         }}
       >
         Interactive Data Visualization Dashboard
      </h1>
        <button onClick={toggleTheme}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data.length > 0 && !loading && !error && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="A" fill="#8884d8" onClick={() => handleBarClick("A")} />
              <Bar dataKey="B" fill="#82ca9d" onClick={() => handleBarClick("B")} />
              <Bar dataKey="C" fill="#ffc658" onClick={() => handleBarClick("C")} />
              <Bar dataKey="D" fill="#ff7300" onClick={() => handleBarClick("D")} />
              <Bar dataKey="E" fill="#ff0000" onClick={() => handleBarClick("E")} />
              <Bar dataKey="F" fill="#FFBB28" onClick={() => handleBarClick("F")} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {selectedLetter && lineChartData.length > 0 && !loading && !error && (
          <div>
            <h2>Details for Letter: {selectedLetter}</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {data.length === 0 && !loading && !error && <p>No data available</p>}
      </div>

      <div className="calendar-wrapper">
        <Calendar
          onChange={setDate}
          value={date}
          className={`custom-calendar ${isDarkMode ? "dark" : "light"}`}
        />
        <div className="date-display">
          Selected Date: <strong>{date.toDateString()}</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
