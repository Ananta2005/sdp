import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const ToogleForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('STUDENT');
  const [id, setId] = useState();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleLogin = async () => {
    if (!id || !password) {
      alert("All fields are required!");
      return;
    }

    const loginData = {
      id,
      password
    };

    try {
      var port = role === "TEACHER" ? 8082 : 8081;
      const response = await axios.post(`http://localhost:${port}/api/${role.toLowerCase()}s/login`, loginData);
      console.log('Login request: ' + response.data);

      if (response.status === 200) {
        navigate(`/${role.toLowerCase()}_login`);
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  }

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password mismatch!");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    const signupData = {
      firstName,
      lastName,
      email,
      password
    }

    try {
      var port = role === "TEACHER" ? 8082 : 8081;
      const response = await axios.post(`http://localhost:${port}/api/${role.toLowerCase()}s/add`, signupData);
      if (response.status === 201) {
        var oi = 0;
        if (port === 8082) {
          oi = response.data.teacher.id;
        } else {
          oi = response.data.student.id;
        }

        alert("Successfully signed up!\nUse the below id for logging in.\nId: " + oi);

        try {
          const evresponse = await axios.post(
            'http://localhost:8083/api/emails/email-verification/send',
            { userEmail: email },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (evresponse.status === 200) {
            alert("Verification email sent! Please check your inbox.");
          }
        } catch (error) {
          console.error("Error sending verification email: ", error);
          alert("Error sending verification email. Please try again later.");
        }

        navigate("/otp");
      }
    } catch (error) {
      console.log("Error: " + error);
      console.log("response data: " + response.data);
      alert("Some error occured while signing up!");
    }
  }

  return (
    <div className='login_container'>
      <div className='role_selector'>
        <button
          className={role === 'STUDENT' ? 'active' : 'inactive'}
          onClick={() => setRole('STUDENT')}
        >
          Student
        </button>
        <button
          className={role === 'TEACHER' ? 'active' : 'inactive'}
          onClick={() => setRole('TEACHER')}
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
            <input
              type="text"
              placeholder={`${role} ID`}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href='#'>Forgot Password</a>
            <button onClick={handleLogin}>Login</button>
            <p>Not a member? <a href='#' onClick={() => setIsLogin(false)}>Signup now</a></p>
          </div>
        ) : (
          <div className='form'>
            <h2>{role} Signup Form</h2>
            <input
              type='text'
              placeholder='Firstname'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Lastname'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToogleForm;
