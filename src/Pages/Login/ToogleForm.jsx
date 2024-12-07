import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';


const ToogleForm = (roleID, setRoleId) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Student');
  const navigate= useNavigate()


  const handleLogin= () =>{
    if(role === 'Student')
    {
      navigate('/student_login')
    }
    else if(role === 'Teacher')
    {
      navigate('/teacher_login')
    }
  }

  const handleSignup= () =>{
    navigate('/otp')
  }

  return (
    <div className='login_container'>
      <div className='role_selector'>
        <button 
          className={role === 'Student' ? 'active' : 'inactive'}
          onClick={() => setRole('Student')}
        >
          Student
        </button>
        <button 
          className={role === 'Teacher' ? 'active' : 'inactive'}
          onClick={() => setRole('Teacher')}
        >
          Teacher
        </button>
      </div>
      
      <div className='form_container'>
        <div className='form_toggle'>
          <button 
            className={isLogin ? 'active' : 'inactive'}
            onClick={() => setIsLogin(true)}
          >
            {role} Login
          </button>
          <button 
            className={!isLogin ? 'active' : 'inactive'}
            onClick={() => setIsLogin(false)}
          >
            {role} Signup
          </button>
        </div>

        {isLogin ? (
          <div className='form'>
            <h2>{role} Login Form</h2>
            <input type="text" placeholder={`${role} ID`} />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder='Password' />
            <a href='#'>Forgot Password</a>
            <button onClick={handleLogin}>Login</button>
            <p>Not a member? <a href='#' onClick={() => setIsLogin(false)}>Signup now</a></p>
          </div>
        ) : (
          <div className='form'>
            <h2>{role} Signup Form</h2>
            <input type='text' placeholder={`${role} ID`} />
            <input type='email' placeholder='Email' />
            <input type='password' placeholder="Password" />
            <input type='password' placeholder='Confirm Password' />
            <button onClick={handleSignup}>Signup</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToogleForm;
