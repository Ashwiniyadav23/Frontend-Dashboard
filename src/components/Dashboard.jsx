import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import data from "./Data";
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
  Brush
} from "recharts";
import "./Dashboard.css";
import { FaMoon, FaSun } from "react-icons/fa"; // Importing icons

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ageGroup, setAgeGroup] = useState("15-25");
  const [gender, setGender] = useState("male");
  const [dateRange, setDateRange] = useState([new Date("2022-04-10"), new Date("2022-10-06")]);
  const [selectedDate, setSelectedDate] = useState(""); // New state for the date input

  useEffect(() => {
    // Filter data based on selected age group, gender, and date range
    const filteredData = data.filter(
      (entry) =>
        entry.Age === ageGroup &&
        entry.Gender.toLowerCase() === gender &&
        new Date(entry.Day) >= dateRange[0] &&
        new Date(entry.Day) <= dateRange[1]
    );
    setChartData(filteredData);
  }, [ageGroup, gender, dateRange]);

  const handleBarClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    // Add actual logout logic here if needed (e.g., redirect, clear session)
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  const handleSimpleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const lineChartData = chartData.map((entry) => ({
    day: entry.Day,
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

        {/* Dark/Light Mode Button with Icons */}
        <button onClick={toggleTheme} className="mode-toggle-button">
          {isDarkMode ? (
            <FaSun size={24} color="yellow" />
          ) : (
            <FaMoon size={24} color="gray" />
          )}
        </button>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div>
        <label htmlFor="age-group">Age Group:</label>
        <select
          id="age-group"
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
        >
          <option value="15-25">15-25</option>
          <option value=">25">Over 25</option>
        </select>

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <div className="date-range">
          <label>Choose Date Range:</label>
          <Calendar
            selectRange={true}
            onChange={handleDateChange}
            value={dateRange}
            className={`custom-calendar ${isDarkMode ? "dark" : "light"}`}
          />
        </div>

        {/* Simple Date Input */}
        <div>
          <label htmlFor="simple-date">Select a Date:</label>
          <input
            type="date"
            id="simple-date"
            value={selectedDate}
            onChange={handleSimpleDateChange}
          />
        </div>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Brush dataKey="Day" height={30} stroke="#8884d8" onChange={handleDateChange} />
              <Bar
                dataKey="A"
                fill="#8884d8"
                onClick={() => handleBarClick("A")}
              />
              <Bar
                dataKey="B"
                fill="#82ca9d"
                onClick={() => handleBarClick("B")}
              />
              <Bar
                dataKey="C"
                fill="#ffc658"
                onClick={() => handleBarClick("C")}
              />
              <Bar
                dataKey="D"
                fill="#ff7300"
                onClick={() => handleBarClick("D")}
              />
              <Bar
                dataKey="E"
                fill="#ff0000"
                onClick={() => handleBarClick("E")}
              />
              <Bar
                dataKey="F"
                fill="#FFBB28"
                onClick={() => handleBarClick("F")}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available</p>
        )}

        {selectedLetter && lineChartData.length > 0 && (
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
      </div>
    </div>
  );
};

export default Dashboard;
