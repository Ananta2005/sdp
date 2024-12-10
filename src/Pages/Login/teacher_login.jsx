import React, { useEffect, useState } from 'react'
import ToogleForm from './ToogleForm'
import Sidebar from '../../Components/Sidebar/sidebar'
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const teacher_login = () => {
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
    <diV>
      <Sidebar />
    </diV>
  ) :
  alert("Error");

  // return <ToogleForm role="Teacher" />
}

export default teacher_login