import tracks from "./tracks.mongo.js"


async function getTrack(id){
  const trackStatus= await tracks.findOne({
        trackName:id
    },{})

    return trackStatus
}


async function postTrack(trackDetails){
    try {
   const postTrackStatus= await tracks.create(trackDetails)
    return(postTrackStatus)
    } catch (error) {
       return(error)
    }
  }


  async function updateTrack(trackDetails){
    try {
   const updateTrackstatus= await tracks.findOneAndUpdate(
   {
    trackName:trackDetails.trackName
   },
   {
    $set:{
      trackName:trackDetails.trackName,
      coverPicture:trackDetails.coverPicture,
      discription:trackDetails.discription,
    },
    $push:{
      posts:trackDetails.posts,
    }
   },

   {
    new:true
   }
    )
  return(updateTrackstatus)
    } 
    
    catch (error) {
       return(error)
    }
  }

 export {getTrack, postTrack ,updateTrack}