import { useSelector } from 'react-redux'
import styles from './create.module.css'
import { TrackCard } from '../../components/trackCard/trackCard'

export default function Create() {
  const user=useSelector((state)=>state.userDetailsSlice.userInfo)
  return (
    <>
     <div className={styles.tracks_wrapper}>
      <div className={styles.createTrack}>
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
