import { useEffect, useState } from 'react'
import style from './trackFeed.module.css'
import { httpGetPostsByTrack } from '../../redux/APIs'
import { useLocation } from 'react-router-dom'
import Post from '../../components/post/post'
import { AddPost } from '../../components/addPost/addPost'
import { useSelector } from 'react-redux'
export const TrackFeed = () => {
  const loc=useLocation()
  const [trackFeed,setTrackFeed]=useState()
  const RealUser=useSelector(state=>state.userDetailsSlice.userInfo)
  useEffect(()=>{
     const x =async()=>{
      setTrackFeed(await httpGetPostsByTrack({trackName:`${loc.pathname.slice(7,).split('_').join(' ')}`})); 
    }
    x()

  },[toggleModal])

  const [isModalOpen,setIsModalOpen]=useState(false)

  function toggleModal() {
      setIsModalOpen(!isModalOpen)
  }
  // console.log(RealUser.Tracks.includes(`${loc.pathname.slice(7,).split('_').join(' ')}`));
  return (
    
    <>
    {isModalOpen && 
    <>
    <AddPost toggleModal={toggleModal} trackName={`${loc.pathname.slice(7,).split('_').join(' ')}`}/>
    </>
     }
    <>
     <div className={style.feed_wrapper}>

      {RealUser.Tracks.includes(`${loc.pathname.slice(7,).split('_').join(' ')}`) ?
      <div className={style.newPost}>
      <button onClick={toggleModal}>Add New post</button>
      </div>:
     null
      }
      
    
    {trackFeed?.trackFeed.slice().reverse().map(e=>{
      return(
        <><Post
        caption={e.caption} 
        comments={e.comments}
        likes={e.likes}
        mediaPicture={e.mediaPicture}
        pfp={e.pfp}
        time={e.time}
        trackName={e.trackName}
        userName={e.userName}
        _id={e._id}
        /></>
      )
    })}
    </div>
    </>
  
    
   
   
        
    </>
  )
}


