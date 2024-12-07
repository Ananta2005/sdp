import React, {useState, useEffect} from 'react'
import './Opt.css'
import axios from 'axios'

const Otp = () => {

  const [otp, setOtp] = useState("")
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(59)
  const [userEmail, setUserEmail] = useState('')

  const resendOtp = () =>{
    setMinutes(1)
    setSeconds(30)
    setOtpEmail()
  }

  const setOtpEmail = async () =>{
    try{
        const response = await axios.post('http://localhost:8080/api/otp/send', null, {
            params: { email: userEmail }
        })
        console.log(response.data)
    }

    catch(error){
        console.log("Error sending OTP: ", error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() =>{
        if(seconds > 0)
        {
            setSeconds(seconds - 1)
        }

        if(seconds === 0)
        {
            if(minutes === 0)
            {
                clearInterval(interval)
            }
            else
            {
                setMinutes(minutes - 1)
                setSeconds(59)
            }
        }
    }, 1000)
    return () => {
        clearInterval(interval)
    }
  }, [seconds, minutes])


  return (
    <div className='container'>
        <div className='card'>
            <h4>Verify OTP</h4>

            <input className= 'otp-inp' type="email" placeholder='Enter your Email' value={userEmail} onChange={({ target }) => {
                setUserEmail(target.value)
            }}/>

            <input className='otp-inp' placeholder='Enter OTP' value={otp} onChange={({ target }) =>{
                setOtp(target.value)}} />

            <div className='countdown-text'>
                <p>Time Remaining:{" "}
                    <span style={{ fontWeight: 600 }}>
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                </p>

                <button disabled= {seconds > 0 || minutes > 0}  style={{color: seconds > 0 || minutes > 0 ? "#DFE3EB" : "#FF5630"}} onClick= {resendOtp}>Resend</button>
            </div>
          
          <button className='submit-btn'>SUBMIT</button>
        </div>
    </div>
    
  )
}

export default Otp