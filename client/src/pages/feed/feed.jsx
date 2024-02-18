import { useEffect } from "react";
import Post from "../../components/post/post";
import Story from "../../components/story/story";
import style from './feed.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../redux/features/feedDetailsSlice";


export default function Feed() {

  const dispatch=useDispatch()
  const userName=useSelector(state=>state.userDetailsSlice.userInfo.userName)

  useEffect(()=>{
    dispatch(getFeed({userName}))
  },[])   

  const allPosts=useSelector(state=>state.feedDetailsSlice.feed.yourFeed)

  return (
    <>
    <div className={style.feed_wrapper}>
    {/* <Story /> */}
    {allPosts &&
    allPosts.map((e)=>{
      return(
        <>
        <Post 
        caption={e.caption} 
        comments={e.comments}
        likes={e.likes}
        mediaPicture={e.mediaPicture}
        pfp={e.pfp}
        time={e.time}
        trackName={e.trackName}
        userName={e.userName}
        _id={e._id}

        />


        </>
      )
   
    })
  }
    
    
    </div>
       
    </>
  )
}
