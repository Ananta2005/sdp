import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/sidebar'
import './Reg_Courses.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Reg_Card from './Reg_Card'
import java from '../../assets/java.jpg'
import python from '../../assets/python.jpg'
import react from '../../assets/react.svg'
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';


const Reg_Courses = () => {
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

  const [courses, setCourses] = useState([
    { id: 1, img: java, title: 'Java OOPs', desc: 'Object Oriented Programing using Java' },
    { id: 2, img: python, title: 'Python', desc: 'Simple to use Language' },
    { id: 3, img: react, title: 'React', desc: 'Framework to build web, mobile and desktop apps ' }
  ])

  const handleRegister = (id) => {
    setCourses(courses.filter(course => course.id !== id))
    toast.success('Course Registered!')
  }

  if (!token) {
    setTimeout(() => {
      navigate('/login');
    });
  }

  return (

    <div className='course_reg'>
      <Sidebar />
      <h1 className='heading'>Courses Enrollment</h1>

      <div className='card-container' >
        {courses.map(course => (
          <Reg_Card key={course.id} img={course.img} title={course.title} desc={course.desc} onRegister={() => handleRegister(course.id)} />
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Reg_Courses