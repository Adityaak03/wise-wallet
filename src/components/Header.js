import React from 'react'
import logo from './logo-no-background.png'
import './index.css'

const Header = () => {
  return (
    <div className='logoDiv'>
    <img src={logo} alt='' className='logo'></img>
    </div>
  )
}

export default Header