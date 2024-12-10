import { useState, React, useEffect } from 'react'
import ToogleForm from './ToogleForm'
import Sidebar from '../../Components/Sidebar/sidebar'
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const student_login = ({ role = "Student" }) => {
  const { token, logout } = useAuth();
  const [data, setData] = useState(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTokenChecked(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (token && isTokenChecked) {
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
  }, [token, isTokenChecked, logout]);

  return token ? (
    <div>
      <Sidebar />

      <div className='student_content'>
        <h1>Hello {role}</h1>
        {/* <ToogleForm role="Student" /> */}
      </div>
    </div>
  ) :
  alert("Error");
}

export default student_login