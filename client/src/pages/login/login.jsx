import style from './login.module.css'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUser, postUSerIdle} from '../../redux/features/userDetailsSlice';


function Login() {

    const [loginDetails,setLoginDetails]=useState({})
const dispatch=useDispatch()
const navigate=useNavigate()
 const user=useSelector(state=>state.userDetailsSlice)


        useEffect(()=>{
            if(user?.status==='fulfilled'){
                navigate('/') 
                dispatch(postUSerIdle())
            }
            
            
        },[user?.status])


    const handleChange=(e)=>{
        setLoginDetails(()=>({...loginDetails,[e.target.name]:e.target.value}));
    }

    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(getUser(loginDetails))
        
       
        // .then(()=>{
        //     if(user.status==='fulfilled'){
        //     navigate('/')
        //     }
        // })
    }


  return (
    <>
 <div className={style.login_page_wrapper}>
    <div className={style.login_card}>
        <form className={style.login_form}>
            <input type="text" name='userName' placeholder='Username' onChange={(e)=>handleChange(e)}/>
            <input type="password" name='password' placeholder='Password' onChange={(e)=>handleChange(e)}/>
            <button className={style.login_bttn} onClick={(e)=>{handleLogin(e)}}>
            <span className={style.login_bttn_text}>LOGIN</span>
            </button>
            <button className={style.gotoregister_bttn} onClick={()=>navigate("/register")}>
            <span className={style.gotoregister_bttn_text}>Register</span>
            </button>
        </form>   
    </div>
</div>            
    </>
  )
}

export default Login