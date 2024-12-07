import { useState, React } from 'react'
import ToogleForm from './ToogleForm'
import Sidebar from '../../Components/Sidebar/sidebar'

const student_login = ({role = "Student"}) => {

  // const [roleId, setRoleId] = useState('Student')

  return (
    <div>
      <Sidebar />
    
      <div className='student_content'>
        <h1>Hello {role}</h1>
        {/* <ToogleForm role="Student" /> */}
      </div>
    </div>
  )
}

export default student_login