import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { FaUserCircle,FaEye,FaEyeSlash  } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { userLogin } from '../slices/userSlice';


function Login() {
    let [type,setType]=useState('password');
    let [icon,setIcon]=useState(FaEye);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let {register,handleSubmit,formState:{errors}}=useForm();
    const onFormSubmit=(userdata)=>{
        dispatch(userLogin(userdata));
        navigate('/userdashboard')
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
      <div className="outer-login-box">
        <div className="inner-login-box">
            <h1>Login</h1>    
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
                <div className="submit-btn">
                    <button type="submit" className="btn btn-outline-light">Login</button>
                </div>
                <p className="text-center">Don't have an account?<Link className='nav-link' to='/signup'>Signup</Link></p>
            </form>
        </div>    
    </div>  
    </div>
  )
}

export default Login
