import './Navbar.css'
import { Link } from 'react-router-dom'
import logo_light from '../../assets/logo-black.png'
import logo_dark from '../../assets/logo-white.png'
import search_icon_light from '../../assets/search-w.png'
import search_icon_dark from '../../assets/search-b.png'
import toggle_light from '../../assets/night.png'
import toggle_dark from '../../assets/day.png'
import profile_light from '../../assets/profile-dark.png'
import profile_dark from '../../assets/profile-light.jpg'
import { useEffect, useState } from 'react'

const Navbar = ({ theme, setTheme }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className='navbar'>
      <img src={theme === 'light' ? logo_light : logo_dark} alt="" className='logo' />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li>Courses</li>
        <li>Performance</li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <div className='search-box'>
        <input type='text' placeholder='Search' />
        <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt='' />
      </div>

      <img
        onClick={toggle_mode}
        src={theme === 'light' ? toggle_light : toggle_dark}
        alt=""
        className='toggle_icon'
      />


      {isLoggedIn && (
        <Link to="/profile">
          <img
            className='profile-icon'
            src={theme === 'light' ? profile_light : profile_dark}
            alt="Profile"
          />
        </Link>
      )}
    </div>
  );
}

export default Navbar;
