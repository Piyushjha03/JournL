import { useEffect, useRef, useState } from 'react';
import styles from './post.module.css'
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { updateFeed } from '../../redux/features/feedDetailsSlice';
import { useNavigate } from 'react-router-dom';
import { BsPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { updateUser } from '../../redux/features/userDetailsSlice';


export default function Post(thisPost) {
    const user=useSelector((state)=>state.userDetailsSlice.userInfo)
    const [likes, setlikes] = useState(thisPost.likes.length)
    const[isliked,setIsLiked]=useState(thisPost?.likes?.includes(user.userName))
    const [expandedCaption,setExpandedCaption]=useState(false)
    const [commentWindow,setCommentWindow]=useState(false)
    const [comment,setComment]=useState('')
    const [isFollowing,setIsFollowing]=useState(user?.following.includes(thisPost.userName))
const dispatch=useDispatch()
   const nav=useNavigate()

    const commentRef = useRef(null);

    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true)
    },[])

function handleClickOutside(e){
    if(commentWindow===false && !commentRef.current?.contains(e.target)){
        setCommentWindow(false)
    }
    else{
        setCommentWindow(true)
    }
}

    const handleLike=()=>{
        setIsLiked(!isliked)
        setlikes(!isliked ? likes+1 : likes-1)

        
        if(!thisPost?.likes.includes(user.userName) && !isliked){
            const x={_id:thisPost._id,likes:user.userName}
            dispatch(updateFeed({postDetails:x}))

        }
        else{ 
            const x={_id:thisPost._id,likestoRemove:user.userName}
            dispatch(updateFeed({postDetails:x}))

        }
    }
    const handleCaption=()=>{
        setExpandedCaption(!expandedCaption)
    }
    const sendComment=()=>{
        if(comment===''){
            // setCommentWindow(false)
        }
        else{
            const x={_id:thisPost._id,comments:{commentContent:comment,userName:user.userName,profilePicture:user.profilePicture}}
            dispatch(updateFeed({postDetails:x}))
            setComment('')
            setCommentWindow(false)

        }
    }
    function handleComment(e){
        setComment(e.target.value)
        
    }

    function handleFollowClick(){
       setIsFollowing(!isFollowing)
       

        if(isFollowing){

            const updatedFollowingList=user.following.filter((eachFollowing)=>{
                if(eachFollowing!=thisPost.userName){
                    return eachFollowing
                }
            })
            dispatch(updateUser({...user,following:updatedFollowingList}))
        }
        else{
            
            const updatedFollowingList=user.following.concat([thisPost.userName])
            dispatch(updateUser({...user,following:updatedFollowingList}))
        }
    }


  return (
   <>
   <div className={styles.post}>
     <div className={styles.postCard_left}>
        <div className={styles.postCard_left_content}>
        <div className={styles.followButton} onClick={()=>{handleFollowClick()}}>
            {thisPost.userName != user.userName ?
            <> {isFollowing ? <BsPatchMinusFill/>  :<BsPatchPlusFill/> }
            </>
            :
            <></>
            }
        </div>
        <div className={styles.userDetailsForMobile}>
            <div className={styles.userInfo_mobile}>
                                <div className={styles.profilePicture_container_mobile}>
                                <img src={`${thisPost?.pfp.includes('cloudinary') ? thisPost.pfp : `${thisPost.pfp}/60` }`} alt="pfp"  draggable="false"/>
                                </div>
                                 <div className={styles.userName_mobile}  onClick={()=>`${nav(`/u/${thisPost.userName}`)}`} >{`${thisPost.userName}`}</div>
                                 <div className={styles.userInfo_trackName_mobile} onClick={()=>`${nav(`/track/${thisPost.trackName}`)}`}>{`${thisPost.trackName}`}</div>
                                {/* <div className={styles.trackNumber_mobile}>#14</div> */}
            </div>
        </div>
            <div className={styles.postMedia}>
                <img src={`${thisPost?.mediaPicture.includes('cloudinary') ? thisPost.mediaPicture : `${thisPost.mediaPicture}/1800` }`} alt="image" draggable="false" />
            </div>
            <div className={`${styles.postInfo} ${styles.not_selectable}`}>
                        
                        <div className={`${styles.likes} ${styles.not_selectable } ${isliked ? `${styles.liked}` : ''} `} onClick={handleLike}>
                       <FaRegHeart className={styles.icon} height={'25px'} width={'25px'}/>
                       {likes}
                        </div>
                               
    
                            <div className={`${styles.comments} ${styles.not_selectable }`} >
    
                         <FaRegCommentAlt className={styles.icon} height={'25px'} width={'25px'} />
                         {thisPost.comments.length}
                            </div>
                            <div className={styles.dateOfPost}>
                            <IoCalendarClearOutline className={styles.icon} height={'25px'} width={'25px'} />
                            {thisPost.time?.slice(5,10)}
                        </div>
    
                        </div>
        </div>
        
                        
                    </div>

                   <div className={styles.postCard_right}>
                        <div className={styles.postCard_right_content}>
                            <div className={styles.userInfo}>
                                <div className={styles.profilePicture_container}>
                                <img src={`${thisPost?.pfp.includes('cloudinary') ? thisPost.pfp : `${thisPost.pfp}/60` }`} alt="pfp"  draggable="false"/>
                                </div>
                                 <div className={styles.userName}  onClick={()=>`${nav(`/u/${thisPost.userName}`)}`} >{`${thisPost.userName}`}</div>
                                 <div className={styles.userInfo_trackName}onClick={()=>`${nav(`/track/${thisPost.trackName.split(' ').join('_')}`)}`}>{`${thisPost.trackName}`}</div>
                                {/* <div className={styles.trackNumber}>#14</div> */}
                            </div>
                            <div className={styles.postCaption}>
                                {expandedCaption ? <>
                                <div className={styles.expandCaption}>
                                <div className={styles.expandCaptionDisplay}>
                                {thisPost.caption}
                            <span onClick={handleCaption}>less</span>
                            </div>
                        </div>
                        </>
                        : <>
                        <div className={styles.collapsedCaption}>
    
                        {thisPost.caption.slice(0,10)}
                            
                        {thisPost.caption.length > 10 &&
                        <span onClick={handleCaption}>more</span>
                        }
                        </div>
                        </>
                        }
                        
                       
                    </div>
                    {commentWindow ? 
                    <>
                    <div className={styles.comment_bg_screen}>
                    <div ref={commentRef} className={styles.comment_writing_window} >
                        <div className={styles.comment_pfp}>
                            <img src={`${thisPost?.pfp?.includes('cloudinary') ? thisPost.pfp : `${thisPost.pfp}/60` }`} draggable='false' alt="pfp" />
                        </div>

                        <textarea name="comment" maxLength={50} autoFocus placeholder='Add a Comment....' onChange={(e)=>{handleComment(e)}} ></textarea>
                        <button className={styles.comment_btn} onClick={sendComment}>Send</button>
                    </div>

                    </div>
                    
                     </> : null}
                     <div className={styles.comments_wrapper}>
                        
                        <div className={styles.addComment}  onClick={()=>setCommentWindow(!commentWindow)}> Add a comment... </div>
                        <div className={styles.otherComments}>
                            {thisPost.comments.toReversed().map((eachComment)=>{
                                return(
                                <>
                                <div className={styles.commentInfo}>
                                <img src={`${eachComment?.profilePicture.includes('cloudinary') ? eachComment.profilePicture : `${eachComment.profilePicture}/300` }`}  alt="pfp" />
                                <div className={styles.CommentuserName}>{`${eachComment.commentContent}`}</div>
                                </div>
                                </>)

                            })}

                        </div>
                    </div>     
                    </div>

                    </div>

                    </div>
                    

   
   </>
  )
}    

                    