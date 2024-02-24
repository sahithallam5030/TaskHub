import React from 'react'
import { FaLinkedin,FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { LuCopyright } from "react-icons/lu";

function Footer() {
  return (
    <div className='footer-section'>
        <div className="container footer">
          <div className="about">
            <h5>ABOUT THE WEBSITE</h5>
            <p>Elevate your lifestyle with Task Hub – your trusted ally in productivity. Streamline tasks, achieve goals, and embrace simplicity with our intuitive todo list. Join us in making every day more efficient and organized.</p>
          </div>
          <div className="contact">
            <p><FaLocationDot/> Hyderabad</p>
            <p><IoMail/> sahithallam5030@gmail.com</p>
            <p><FaPhoneAlt/> 9059778895</p>
            <p><FaLinkedin/> <Link className='nav-link d-inline' to='https://www.linkedin.com/in/sahith-allam/'>Sahith Allam</Link></p>
          </div>
        </div>
        <p className='text-center copy'>Copyright <LuCopyright /> 2024: Design and Developed By Sahith Allam</p>
    </div>
  )
}

export default Footer
