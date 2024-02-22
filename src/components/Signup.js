import axios from 'axios';
import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { FaUserCircle,FaEye,FaEyeSlash  } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link,useNavigate } from 'react-router-dom';

function Signup() {
    let [type,setType]=useState('password');
    let [icon,setIcon]=useState(FaEye);
    const navigate=useNavigate();
    let {register,handleSubmit,formState:{errors}}=useForm();
    const onFormSubmit=async(userdata)=>{
        let response=await axios.post('/users/create-user',userdata);
        if(response.data.message==="Account created successfully"){
            alert(response.data.message);
            navigate('/login');
        }
        else{
            console.log(response);
        }
    }
    const togglePassword=()=>{
        if(type==='password'){
            setType('text');
            setIcon(FaEyeSlash);
        }
        else{
            setType('password');
            setIcon(FaEye);
        }
    }
  return (
    <div>
      <div className="outer-login-box signup-box">
        <div className="inner-login-box">
            <h1>Signup</h1>    
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="inputs">
                    <label htmlFor="username" className='form-label'>Username</label>
                    <div className="input-fields">
                        <input type="text" name="username" id="username" className="form-control" placeholder='Enter username' {...register('username',{required:true})}/>
                        <div className="icon"><FaUserCircle /></div>
                    </div>
                    {
                        errors.username?.type==='required' && <p className="text-danger">*Please enter username</p>
                    }
                </div>
                <div className="inputs">
                <label htmlFor="password" className='form-label'>Password</label>
                    <div className="input-fields">
                        <input type={type} name="password" id="password" className="form-control" placeholder='Enter password' {...register('password',{required:true})}/>
                        <div className="icon p-icon" onClick={togglePassword}>{icon}</div>
                    </div>
                    {
                        errors.password?.type==='required' && <p className="text-danger">*Please Enter password</p>
                    }
                </div>
                <div className="inputs">
                <label htmlFor="email" className='form-label'>Email</label>
                    <div className="input-fields">
                        <input type="text" name="email" id="email" className="form-control" placeholder='Enter email' {...register('email',{required:true})}/>
                        <div className="icon"><IoMail /></div>
                    </div>
                    {
                        errors.email?.type==='required' && <p className="text-danger">*Please Enter email</p>
                    }
                </div>
                <div className="submit-btn  ">
                    <button type="submit" className="btn btn-outline-light">Create Account</button>
                </div>
                <p className='text-center'>Already Have an Account?<Link className='nav-link' to='/login'>Login</Link></p>
            </form>
        </div>    
    </div>  
    </div>
  )
}

export default Signup
