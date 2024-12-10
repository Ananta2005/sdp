import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/sidebar'
import './Upload.css'
import * as XLSX from 'xlsx'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const Upload = () => {
    const { token, logout } = useAuth();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

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

    //onchange states
    const [excelFile, setExcelFile] = useState(null)
    const [typeError, setTypeError] = useState(null)


    //submit state
    const [excelData, setExcelData] = useState(null)

    //onChange event
    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv']
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null)
                let reader = new FileReader()
                reader.readAsArrayBuffer(selectedFile)
                reader.onload = (e) => {
                    console.log("File Read Successfully")
                    setExcelFile(e.target.result)
                }
            }
            else {
                setTypeError('Please select only excel file types')
                setExcelFile(null)
            }
        }
        else {
            console.log('Please select your file')
        }
    }

    //submit Event
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' })
            const worksheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[worksheetName]
            const data = XLSX.utils.sheet_to_json(worksheet)
            setExcelData(data.slice(0, 10))
        }
    }


    const [labelColumn, setLabelColumn] = useState(null)
    const [valueColumn, setValueColumn] = useState(null)
    const handleColumnSelection = (labelKey, valueKey) => {
        setLabelColumn(labelKey)
        setValueColumn(valueKey)
    }


    const chartData = {
        labels: ['Ananta', 'Raj', 'John', 'Alice', 'Bob'],
        datasets: [{
            label: 'Attendance',
            data: [90, 45, 85, 80, 100],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 0.5)',
            borderWidth: 1,
        },

        {
            label: "Total Marks",
            data: [90, 45, 85, 70, 95],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        ],
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Student Name',
                },
            },

            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Values',
                },
            },
        },
    }

    if (!token) {
        alert("Authentication error");
        setTimeout(() => {
            navigate('/login');
        });
    }


    return (
        <div className='parent'>
            <Sidebar />
            <h3>Upload & view Exccel Sheets</h3>

            <form className='form-group' onSubmit={handleFileSubmit}>
                <input type='file' className='form-control' required onChange={handleFile} />
                <button type='submit' className='button'>UPLOAD</button>
                {typeError && (
                    <div className='alert' role='alert'>{typeError}</div>
                )}
            </form>

            <div className='viewer'>
                {excelData ? (
                    <>
                        <div>
                            <label>Select Label Column:</label>
                            <select
                                onChange={(e) => handleColumnSelection(e.target.value, valueColumn)}
                                value={labelColumn || ''}>

                                <option value=''>Select Column</option>
                                {Object.keys(excelData[0]).map((key) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>

                            <label>Select Value Column:</label>
                            <select
                                onChange={(e) => handleColumnSelection(labelColumn, e.target.value)}
                                value={valueColumn || ''}>

                                <option value=''>Select Column</option>
                                {Object.keys(excelData[0]).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className='table-responsive'>
                            <table className='table'>

                                <thead>
                                    <tr>
                                        {Object.keys(excelData[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {excelData.map((individualExcelData, index) => (
                                        <tr key={index}>
                                            {Object.keys(individualExcelData).map((key) => (
                                                <td key={key}>{individualExcelData[key]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='chart-container'>
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </>
                ) : (
                    <div>No Files Uploaded yet</div>
                )}
            </div>
        </div>
    )
}

export default Upload