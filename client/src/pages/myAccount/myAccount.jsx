import {  useDispatch, useSelector } from 'react-redux';
import styles from './myAccount.module.css'
import { TrackCard } from '../../components/trackCard/trackCard';
import { FaGear } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { MdDone } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";
import {  postTrack, postUSerIdle, updateUser } from '../../redux/features/userDetailsSlice';
import { TbCrosshair } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
const axiosWithoutCredentials = axios.create();
axiosWithoutCredentials.defaults.withCredentials = false;

export  const MyAccount = () => {

  const user=useSelector(state=>state.userDetailsSlice.userInfo)
  const[isEditable,setIsEditable]=useState(false)
  const[currentUserDetails,setCurrentUserDetails]=useState({...user})
  const [addTrack,setAddTrack]=useState(false)
  const dispatch=useDispatch()

  const[imageToUpload,setImageToUpload]=useState()
    const[captiontext,setCaptiontext]=useState('')
    const[desctext,setdesctext]=useState('')
    const[imagePreview,setImagePreview]=useState()
    const[postDetails,setPostDetails]=useState({})
    const [isNameDone,setisNameDone]=useState(false)
    const[isReady,setIsReady]=useState(false)
  
  function handleEdit(){
    setIsEditable(!isEditable)
    if(isEditable){

      dispatch(updateUser(currentUserDetails)).then(()=>{
        dispatch(postUSerIdle())
      })
     
    }
  }
  function handleChange(e)
  {
    e.preventDefault()
    setCurrentUserDetails({...user,[e.target.name] : e.target.value})
  }

 async function handleAddTrack(){
  setAddTrack(true)
    // const postDetails={userName:user.userName,trackName:'Track30',coverPicture:'https://picsum.photos/id/502',description:'newTrack'}
    // dispatch(postTrack(postDetails))
  }

  function addImage(){
    document.getElementById('images').click();
  }
  function handleImage(e){
    setImageToUpload(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
}
function handleTrackName(e){
 setCaptiontext(e.target.value)
}
function handleDesc(e){
  setdesctext(e.target.value)
}
async function handleUpload(){
  await uploadimage()

  
}
async function uploadimage(){
  const data = new FormData()
  data.append("file", imageToUpload);
  data.append("upload_preset", "w96imylc");
  data.append("cloud_name", "dhxgnzie8");

  try {
      await axiosWithoutCredentials.post("https://api.cloudinary.com/v1_1/dhxgnzie8/image/upload/",data,
      {headers: {
            'Content-Type': 'multipart/form-data',
          }}).then((response)=>{
              setPostDetails(()=>({...postDetails,
                  userName:user.userName,
                  trackName:captiontext,
                  coverPicture:response.data.secure_url,
                  description:desctext,
              }))
              setIsReady(true)
            
          })
    } catch (error) {
      throw await error;
    }
}

useEffect(()=>{
  if(isReady){
    dispatch(postTrack(postDetails))
    setIsReady(false)
  }
},[isReady])
  return (
    <>
    
    <div className={styles.myAccount_wrapper}>

    
    <div className={styles.userInfo_wrapper}>
      <div className={styles.userPass_wrapper}>
        <div className={styles.userPass_inner_wrapper}>
        <div className={styles.userPass_edit} onClick={handleEdit}>
          {isEditable ?<MdDone />:<FaGear/>}
        </div>
        {isEditable ?
        <>
        <div className={styles.userPass_left}>
            <div className={styles.userPass_dp}>
              <img src={`${user.profilePicture}/400`} alt="pfp" />
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
              First Name: <input type='text' name='firstName' className={styles.firstName_input} defaultValue={`${user.firstName}`} onChange={(e)=>handleChange(e)}/>
            </div>
            <div className={styles.lastName}>
              Last Name: <input type='text' name='lastName' className={styles.firstName_input} defaultValue={`${user.lastName}`}/>
            </div>
            <div className={styles.followerCount}>
              Followers: {user.followers.length}
            </div>
            <div className={styles.followingCount}>
              Following: {user.following.length}
            </div>
            <div className={styles.trackCount}>
              Tracks: {user.Tracks.length}
            </div>
            <div className={styles.userPass_barcode}>
              ||||||||||||||||||
            </div>
          </div>
        </>
        :
        <>
        <div className={styles.userPass_left}>
            <div className={styles.userPass_dp}>
              <img src={`${user.profilePicture}/400`} alt="pfp" />
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
              Tracks: {user.Tracks.length}
            </div>
            <div className={styles.userPass_barcode}>
              ||||||||||||||||||
            </div>
          </div>
        </>
        }
          
        </div>
      </div>
    </div>
    <div className={styles.tracks_wrapper}>
    {addTrack ? 
    <>
    <div className={styles.trackCard_wrapper} >
      <button onClick={()=>{setAddTrack(false)}}><RxCrossCircled/></button>
      {imagePreview ?

        isNameDone ? 
        <>
        <div  className={styles.addDesc} onClick={()=>{}} >
             <img src={imagePreview} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />
            <input id='trackDesc' type="text" name='trackDesc' onChange={(e)=>handleDesc(e)} placeholder='Add Description...'/>
            {/* <button onClick={uploadimage}>upload</button>
            <button onClick={postPost}>post</button> */}
        </div>
        <div className={styles.upload} onClick={handleUpload}>
            <FaArrowRight />
        </div>
        </>
        :
          <>
        <div  className={styles.addCaption} onClick={()=>{}} >
             <img src={imagePreview} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />
            <input id='trackName' type="text" name='trackName' onChange={(e)=>handleTrackName(e)} placeholder='Add Track Name...'/>
            {/* <button onClick={uploadimage}>upload</button>
            <button onClick={postPost}>post</button> */}
        </div>
        <div className={styles.create} onClick={()=>{
          document.getElementById('trackName').value=''
          setisNameDone(true)}}>
            <FaArrowRight />
        </div>
          </>
           :
           <>
            <div  className={styles.addPhoto} onClick={addImage}>
            <TbCrosshair />
        <form >
            <input id='images' type="file" accept='image/*' name='image' onChange={(e)=>handleImage(e)} style={{display:'none'}}/>
        </form>
        </div>
        <div className={styles.trackCard_Name}>
            Add Image
        </div>
           </>

           }
        
    </div>

    </> 
    :
    <>
    <div className={styles.add_new}>
      <div className={styles.yourTrack_text}>Add New Track</div>
      <button onClick={()=>handleAddTrack()}><IoMdAddCircle /></button>
      </div>
    </>
    }
      
      
        {user.Tracks.slice().reverse().map((el)=>{
          
            return(
              <>
               <TrackCard trackName={el} />
              </>
             
            )
        })}
    </div>
    </div>
    
        </>
        
  )
}

