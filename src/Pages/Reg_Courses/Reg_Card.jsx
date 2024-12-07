import React from 'react'
import './Reg_Courses.css'


const Reg_Card = (props) => {
  return (
    <div className='card'>
        <img className= "card_img" src= {props.img}/>
        <h2 className='card_title'>{props.title}</h2>
        <p className='card_desc'>{props.desc}</p>
        <button type='submit' className='card_btn' onClick={props.onRegister} >Register</button>
    </div>
  )
}

export default Reg_Card