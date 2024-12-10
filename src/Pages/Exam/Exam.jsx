import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import './Exam.css'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "../../Components/Sidebar/sidebar";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Exam = () => {
  const { token, logout } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      api.get("https://jwt-service.up.railway.app/test")
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data', error);
          if (error.response && error.response.status === 401) {
            logout();
          }
        });
    }
  }, [token, logout]);

  const [studentData, setStudentData] = useState({
    name: "",
    almMarks: "",
    assignmentMarks: "",
    courseMarks: "",
  });
  const [chartData, setChartData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const { name, almMarks, assignmentMarks, courseMarks } = studentData;
    if (!name || !almMarks || !assignmentMarks || !courseMarks) {
      alert("Please fill out all fields.");
      return;
    }


    setChartData({
      labels: ["ALM Marks", "Assignment Marks", "Course Marks"],
      datasets: [
        {
          label: `${studentData.name}'s Performance`,
          data: [
            parseFloat(almMarks),
            parseFloat(assignmentMarks),
            parseFloat(courseMarks),
          ],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    });


    setStudentData({ name: "", almMarks: "", assignmentMarks: "", courseMarks: "" });
  };

  if (!token) {
    alert("Authentication error");
    setTimeout(() => {
      navigate('/login');
    });
  }

  return (

    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Sidebar />
      <h2>Student Performance Radar Chart</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Student Name:{" "}
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            ALM Marks (0-100):{" "}
            <input
              type="number"
              name="almMarks"
              value={studentData.almMarks}
              onChange={handleChange}
              placeholder="Enter ALM marks"
              min="0"
              max="100"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Assignment Marks (0-100):{" "}
            <input
              type="number"
              name="assignmentMarks"
              value={studentData.assignmentMarks}
              onChange={handleChange}
              placeholder="Enter Assignment marks"
              min="0"
              max="100"
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Course Marks (0-100):{" "}
            <input
              type="number"
              name="courseMarks"
              value={studentData.courseMarks}
              onChange={handleChange}
              placeholder="Enter Course marks"
              min="0"
              max="100"
              required
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Add Data
        </button>
      </form>

      {chartData ? (
        <div>
          <Radar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                r: {
                  beginAtZero: true,
                  max: 100,
                  ticks: {
                    stepSize: 10,
                  },
                  title: {
                    display: true,
                    text: "Performance Metrics",
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div>
          <p>No data available. Enter details to view the radar chart.</p>
        </div>
      )}
    </div>
  );
};

export default Exam;
