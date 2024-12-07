import React, { useState, useEffect } from 'react'
import './Opt.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Otp = () => {

    const [otp, setOtp] = useState("")
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(59)
    const [userEmail, setUserEmail] = useState('')
    const navigate = useNavigate()

    const resendOtp = () => {
        setMinutes(1)
        setSeconds(30)
        setOtpEmail()
    }

    const setOtpEmail = async () => {
        console.log("HERE");
        try {
            const response = await axios.post(
                'http://localhost:8083/api/emails/email-verification/send',
                { userEmail: userEmail },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(response.data)
        } catch (error) {
            console.log("Error sending OTP: ", error)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval)
                }
                else {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [seconds, minutes])

    const handleVerifyOtp = async () => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) {
            alert("Please enter a valid email address!");
            return;
        }

        const verificationData = {
            email: userEmail,
            token: otp
        }

        console.log("Sending: " + verificationData.userEmail);
        console.log("Sending: " + verificationData.token);

        try {
            const evresponse = await axios.post(`http://localhost:8083/api/emails/email-verification/verify`, verificationData);
            if (evresponse.status === 200) {
                alert("Successfully verified email!");
                navigate("/login");
            } else {
                console.error("Data: ", evresponse.data);
                alert("Error verifying. Please try again later.");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Error verifying. Please try again later.");
        }
    }


    return (
        <div className='container'>
            <div className='card'>
                <h4>Verify OTP</h4>

                <input
                    className='otp-inp'
                    type="email"
                    placeholder='Enter your Email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />

                <input
                    className='otp-inp'
                    placeholder='Enter OTP'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <div className='countdown-text'>
                    <p>Time Remaining:{" "}
                        <span style={{ fontWeight: 600 }}>
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                    </p>

                    <button disabled={seconds > 0 || minutes > 0} style={{ color: seconds > 0 || minutes > 0 ? "#DFE3EB" : "#FF5630" }} onClick={resendOtp}>Resend</button>
                </div>

                <button className='submit-btn' onClick={handleVerifyOtp} >Submit</button>
            </div>
        </div>

    )
}

export default Otp;
