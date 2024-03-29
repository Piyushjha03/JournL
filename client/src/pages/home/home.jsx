import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "../../components/navbar/navbar"
import style from './home.module.css'
import { useSelector } from "react-redux"
import { FaUserEdit } from "react-icons/fa"


function Home() {
  const nav=useNavigate()
  const currentUser= useSelector(state=>state?.userDetailsSlice?.userInfo)
  return (
    <>

    <div className={style.home_page_wrapper}>
    <div className={style.navbar}>
    <Navbar/>
    </div>
    <div className={style.main_content}>
    <Outlet/>
    </div>
    <div className={style.right_content}>
    <>
    <div className={style.myAccount_wrapper}>

      <div className={style.userInfo}>
      <button onClick={()=>{nav('/myAccount')}}><FaUserEdit/></button>
        <div className={style.profilePicture_container}>
            <img src={`${currentUser?.profilePicture?.includes('cloudinary') ? currentUser.profilePicture : `${currentUser.profilePicture}/60` }`} alt="pfp"  draggable="false"/>
        </div>
        <div className={style.userdetails}>
        <div className={style.userName} >{`${currentUser.userName}`}</div>
        <div className={style.Name} >{currentUser.firstName + ' ' + currentUser.lastName }</div>
        </div>
        
        </div>
    </div>
    </>
    
    </div>
    </div>

    
    
    </>
   
  )
}

export default Home