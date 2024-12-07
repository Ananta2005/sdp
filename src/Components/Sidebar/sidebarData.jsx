import { DashboardOutlined, UserOutlined, BookOutlined, FormOutlined, LogoutOutlined, UploadOutlined  } from '@ant-design/icons'
import attendance from '../../assets/attendance2.png'
import React from 'react'

const sidebarData = [
  {
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    path: "/student_login"
  },


  {
    title: 'Attendance',
    icon: <UserOutlined />,
    path: "/attendance"
  },

  {
    title: "Courses",
    icon: <BookOutlined />,
    path: "/courses"
  },

  {
    title: "Exam",
    icon: <FormOutlined />,
    path: "/exam"
  },

  {
    title: "Upload",
    icon: <UploadOutlined />,               
    path: "/upload"
  },

  {
    title: "Logout",
    icon: <LogoutOutlined />,
    path: "/"
  }
  

]
export default sidebarData