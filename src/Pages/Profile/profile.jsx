import React, { useEffect } from 'react'
import './profile.css'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const profile = () => {
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

  if (!token) {
    alert("Authentication error");
    setTimeout(() => {
      navigate('/login');
    });
  }

  return (
    <div className='profile_container'>{data}</div>
  );
}

export default profile