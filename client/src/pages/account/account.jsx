import { useLocation } from 'react-router-dom'
import styles from './account.module.css'
import { useEffect, useState } from 'react'
import { httpGetOtherUser } from '../../redux/APIs'
import { TrackCard } from '../../components/trackCard/trackCard'

const Account = () => {
  const location=useLocation()
  const temp=location?.pathname.split('/')
  const userTofind=temp[temp?.length-1]

  const[user,setUser]=useState(null)
  useEffect(()=>{
    async function getuserinfo(){
      const user=await httpGetOtherUser({userName:userTofind})
      setUser(user)
    }
    getuserinfo()
   
   

  },[])

  return (
    <>
    {user &&
      <div className={styles.myAccount_wrapper}>

    
<div className={styles.userInfo_wrapper}>
  <div className={styles.userPass_wrapper}>
    <div className={styles.userPass_inner_wrapper}>
    <>
    <div className={styles.userPass_left}>
        <div className={styles.userPass_dp}>
          <img src={`${user?.profilePicture}/400`} alt="pfp" />
        </div>
        <div className={styles.userPass_userName}>
          #{user.userName}
        </div>
        
      </div>
      <div className={styles.userPass_right}>
        <div className={styles.pass_card_text}>
          JournL Card
        </div>
        <div className={styles.firstName}>
          First Name: <span >{user.firstName}</span>
        </div>
        <div className={styles.lastName}>
          Last Name: <span >{user.lastName}</span> 
        </div>
        <div className={styles.followerCount}>
          Followers: {user.followers.length}
        </div>
        <div className={styles.followingCount}>
          Following: {user.following.length}
        </div>
        <div className={styles.trackCount}>
          Tracks: {user?.Tracks?.length}
        </div>
        <div className={styles.userPass_barcode}>
          ||||||||||||||||||
        </div>
      </div>
    </>
    
      
    </div>
  </div>
</div>
<div className={styles.tracks_wrapper}>
    {user.Tracks.slice().reverse().map((el)=>{
      
        return(
          <>
           <TrackCard trackName={el} />
          </>
         
        )
    })}
</div>
</div>
    }
     

    </>
    
  )
}

export default Account