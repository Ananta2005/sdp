import React, { useState } from 'react'
import './sidebar.css'
import '../../Pages/Login/ToogleForm'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import sidebarData from './sidebarData'


const Sidebar = ({ roleID }) => {

    const [isOpen, setIsOpen] = useState(true)

    const toggle = () =>{
        setIsOpen(!isOpen)
    }

    
    


  return (
    <div className={`sidebar_container ${isOpen ? 'open' : 'closed'}`}>
        <div className='sidebar_header'>
            <button className='sidebar_toggle_btn' onClick={toggle}>
                {isOpen ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
            </button>
            <div>
                {isOpen ? `${roleID}` : ""}
            </div>
        </div>

        <nav className='nav_menu'>
            <ul>
                {sidebarData?.map((item, index) =>(
                    <li key={index}>
                        <a href={item.path}>
                            {item.icon}
                            {isOpen ? item.title : ""}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>

        

    </div>
  )
}

export default Sidebar