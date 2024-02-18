import { useEffect, useState } from 'react'
import styles from './trackCard.module.css'
import { httpGetTrack } from '../../redux/APIs'
import { useNavigate } from 'react-router-dom'

export const TrackCard = (prop) => {
    const [trackDetails,setTrackDetails]=useState()
    useEffect(()=>{
        async function x(){
            setTrackDetails(await httpGetTrack(prop.trackName))  
        }
     x();
    },[])

const nav=useNavigate()
  return (
    <>
    <div className={styles.trackCard_wrapper} onClick={()=>{nav(`/track/${prop.trackName.split(' ').join('_')}`)}} >
        <img src={`${trackDetails?.coverPicture.includes('cloudinary') ? trackDetails?.coverPicture : `${trackDetails?.coverPicture}/1200/400` }`} alt="" />
        <div className={styles.trackCard_Name}>
            {prop.trackName}
        </div>
    </div>
    </>
  )
}

