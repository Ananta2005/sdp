import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
//import Home from './Pages/Home/Home';
import ToogleForm from './Pages/Login/ToogleForm';
import StudentLogin from './Pages/Login/StudentLogin';
import TeacherLogin from './Pages/Login/teacher_login';
import Profile from './Pages/Profile/profile';
import Sidebar from './Components/Sidebar/sidebar';
import './App.css';
import Home from './Pages/Home/Home';
import Reg_Courses from './Pages/Reg_Courses/Reg_Courses';
import Upload from './Pages/Upload/Upload';
import Otp from './Pages/Otp/Otp'
import Exam from './Pages/Exam/Exam'


const App = () => {
  const [theme, setTheme] = useState('light');
  

  return (
    <>
      <Router>
        <div className={`container ${theme}`}>
          <Navbar theme={theme} setTheme={setTheme} />
          
          

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/login" element={<ToogleForm />} />
            <Route path="/student_login" element={<StudentLogin  role='Student'/>} />
            <Route path="/teacher_login" element={<TeacherLogin role='Teacher'/>} />
            <Route path='/courses' element={<Reg_Courses />} />
            <Route path= '/upload' element={<Upload role='Teacher'/>} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/exam' element={<Exam />} />
          </Routes>
        </div>
      </Router>
 
    </>
   
  );
};

export default App;
