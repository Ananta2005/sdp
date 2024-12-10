import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  localStorage.removeItem('jwtToken');
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('jwtToken');
      navigate('/');
    });
  }, [navigate]);

  return null;
};

export default Logout;
