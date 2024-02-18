import {  useEffect, useState } from 'react';
import styles from './addPost.module.css'
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import axios from "axios" 
import { useDispatch } from 'react-redux';
import { httpPostPost } from '../../redux/APIs';
import { TbCrosshair } from 'react-icons/tb';
import { LuPlusCircle } from "react-icons/lu";
import { IoCloudUploadSharp } from "react-icons/io5";
import { postPost } from '../../redux/features/userDetailsSlice';


// creating a new instance of axios
const axiosWithoutCredentials = axios.create();
axiosWithoutCredentials.defaults.withCredentials = false;

export const AddPost = (prop) => {


    const user=useSelector(state=>state.userDetailsSlice.userInfo)
const dispatch=useDispatch()

    const[imageToUpload,setImageToUpload]=useState()
    const[captiontext,setCaptiontext]=useState('')
    const[imagePreview,setImagePreview]=useState()
    const[postDetails,setPostDetails]=useState({})
    const[isReady,setIsReady]=useState(false)


    function handleImage(e){
        setImageToUpload(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
    function handleCaptions(e){
        setCaptiontext(e.target.value)
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
                        trackName:prop.trackName,
                        mediaPicture:response.data.secure_url,
                        caption:captiontext,
                    }))
                    setIsReady(true)

                    
                })
          } catch (error) {
            throw await error;
          }
    }
    
    function handleAddPhoto(){
        document.getElementById('image').click()
    }
    useEffect(()=>{
        if(isReady){
            console.log(postDetails);
            dispatch(postPost(postDetails))
            setIsReady(false)
            prop.toggleModal()
        }
    
    },[isReady])
   
  return (
    <>
    
     <div className={styles.addPostWrapper} >
     <div className={styles.overlay} onClick={()=>prop.toggleModal()}></div> 

     {imagePreview ?
     <>
      <div className={styles.post} >
     <div className={styles.addCaption} >
     <img src={imagePreview} alt="" style={{width:"100%", height:"100%", objectFit:"cover"}} />
            {/* <button onClick={uploadimage}>upload</button>
            <button onClick={postPost}>post</button>   */}
        <input type="text" name='caption' onChange={(e)=>handleCaptions(e)} placeholder='Add caption....' />

     </div>
     <div className={styles.upload} onClick={uploadimage}>
     <IoCloudUploadSharp />

     </div>
     </div>    
     </>
     :
     <>
     <div className={styles.post} >
        <div className={styles.addPhoto} onClick={handleAddPhoto}>
        <TbCrosshair />
        <span>Add Photo</span>
        </div>
        
        <form >
            <input id='image' type="file" accept='image/*' name='image' onChange={(e)=>handleImage(e)} style={{display:'none'}} />
        </form>  
     </div>
     </>
     }
     
    </div> 

      
    </>
  
  )
}
