
import { getPost, updatePost } from "../models/posts/posts.model.js"
import { getTrack , postTrack } from "../models/tracks/tracks.model.js"
import { getUser , updateUser} from "../models/users/users.model.js"


async function httpGetTracks(req,res){
    const id= req.params.id
   const getTrackStatus= await getTrack(id)
   if(!getTrackStatus){
    return res.status(404).json({
        error:"Track Not Found!"
    })
   }
   return res.status(200).json(getTrackStatus)
}

async function httpPostTracks(req,res){
    console.log(req.body);
    const trackDetails=req.body;


    if(!trackDetails.trackName || !trackDetails.userName){
        return res.status(400).json({
            error:"Missing required fields..."
        })
    }

   const validUser= await getUser(trackDetails.userName)

    if(!validUser){
        return res.status(400).json({
            error:"Username Does Not Exist.."
        })
    }

   const postTrackStatus= await postTrack(trackDetails)

    if(!postTrackStatus._id){
        return res.status(400).json({
            error:"Track already exist",
        })
    }

    const userToUpdate=await getUser(trackDetails.userName)
    const updatedTrackList=userToUpdate.Tracks.concat([trackDetails.trackName])

       const updateUserInfo=await updateUser({...userToUpdate._doc,Tracks:updatedTrackList})
    return res.status(201).json(updateUserInfo)

}


async function httpUpdateTracks(req,res){
    const trackDetails=req.body;

    if(!trackDetails.trackName){
        return res.status(400).json({
            error:"Missing TrackName field..."
        })
    }
   const updateTrackstatus= await updateTrack(trackDetails)


    return res.status(201).json(updateTrackstatus)

}

async function httpGetPostsByTrack(req,res){
    const trackDetails=req.body;
    if(!trackDetails.trackName){
        return res.status(400).json({
            error:"Missing TrackName field..."
        })
    }
   
    const trackFromDB= await getTrack(trackDetails.trackName)
    if(!trackFromDB){
        return res.status(404).json({
            error:"Track Not Found!"
        })
       }
    const postsOfTrack=trackFromDB.posts;
    const trackFeed=[]

    for(const post of postsOfTrack){

            const eachPostFromDB=await getPost(post)
            const userOfPost=await getUser(eachPostFromDB.userName)
            eachPostFromDB._doc.pfp=userOfPost.profilePicture;

            const timestamp = eachPostFromDB._id.toString().substring(0,8)
            const date = new Date( parseInt( timestamp, 16 ) * 1000 )
            eachPostFromDB._doc.time=date;

            trackFeed.push(eachPostFromDB);
        
       
    }
    
    return res.status(200).json({
        trackFeed,
    })

}

export {httpGetTracks , httpPostTracks , httpUpdateTracks,httpGetPostsByTrack}















// const dummyData = [
//     {
//       trackName: "Track 01",
//       coverPicture: "https://example.com/track01.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user1"
//     },
//     {
//       trackName: "Track 02",
//       coverPicture: "https://example.com/track02.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user1"
//     },
//     {
//       trackName: "Track 03",
//       coverPicture: "https://example.com/track03.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user2"
//     },
//     {
//       trackName: "Track 04",
//       coverPicture: "https://example.com/track04.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user2"
//     },
//     {
//       trackName: "Track 05",
//       coverPicture: "https://example.com/track05.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user3"
//     },
//     {
//       trackName: "Track 06",
//       coverPicture: "https://example.com/track06.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user3"
//     },
//     {
//       trackName: "Track 07",
//       coverPicture: "https://example.com/track07.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user4"
//     },
//     {
//       trackName: "Track 08",
//       coverPicture: "https://example.com/track08.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user4"
//     },
//     {
//       trackName: "Track 09",
//       coverPicture: "https://example.com/track09.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user5"
//     },
//     {
//       trackName: "Track 10",
//       coverPicture: "https://example.com/track10.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user5"
//     },
//     {
//       trackName: "Track 11",
//       coverPicture: "https://example.com/track11.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user6"
//     },
//     {
//       trackName: "Track 12",
//       coverPicture: "https://example.com/track12.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user6"
//     },
//     {
//       trackName: "Track 13",
//       coverPicture: "https://example.com/track13.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user7"
//     },
//     {
//       trackName: "Track 14",
//       coverPicture: "https://example.com/track14.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user7"
//     },
//     {
//       trackName: "Track 15",
//       coverPicture: "https://example.com/track15.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user8"
//     },
//     {
//       trackName: "Track 16",
//       coverPicture: "https://example.com/track16.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user8"
//     },
//     {
//       trackName: "Track 17",
//       coverPicture: "https://example.com/track17.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user9"
//     },
//     {
//       trackName: "Track 18",
//       coverPicture: "https://example.com/track18.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user9"
//     },
//     {
//       trackName: "Track 19",
//       coverPicture: "https://example.com/track19.jpg",
//       description: "This is the first track",
//       posts: [],
//       userName: "user10"
//     },
//     {
//       trackName: "Track 20",
//       coverPicture: "https://example.com/track20.jpg",
//       description: "This is the second track",
//       posts: [],
//       userName: "user10"
//     }
//   ];
  

  

//   dummyData.map(async(el)=>{
//     await httpPostTracks(el);

//   })
  
  

