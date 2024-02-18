import { resolve } from "path";
import { getPost } from "../models/posts/posts.model.js";
import { getTrack } from "../models/tracks/tracks.model.js";
import { getUser, postUser , updateUser } from "../models/users/users.model.js";
import jwt from 'jsonwebtoken'
import user from "../models/users/users.mongo.js";


async function httpLoginUser(req,res){
    const userDetails= req.body;

    if(!userDetails.userName || !userDetails.password){
        return res.status(400).json({error:'Missing Required Fields'})
    }

try {
    const getuserstatus= await user.login(userDetails)
    const token=createToken(getuserstatus._id)
    res.cookie('jwt',token,{
        // httpOnly: true,
        sameSite: 'None',
        maxAge: 3* 24 * 60 * 60 *1000 ,// 3 days in ms
        secure:true,
        Domain:"journl-mu.vercel.app",
    })
    const {_id,userName,firstName,lastName,profilePicture,followers,following,Tracks}=await getuserstatus

    return res.status(200).json({_id,userName,firstName,lastName,profilePicture,followers,following,Tracks})
} catch (err) {
   return res.status(400).json({error:err.message})
}
}

async function httpPostUser(req,res){
    const userDetails=req.body;


   const postuserstatus= await postUser(userDetails)
   

    if(!postuserstatus._id){

        let errorsList={}
        if(postuserstatus.code===11000){
            errorsList.userName='userName Already Exist'
            return res.status(400).json({
                error: errorsList
            })
        }
        else{

            Object.values(postuserstatus.errors).forEach((el)=>{
                errorsList[el.properties.path]=el.properties.message
            })
            return res.status(400).json({
                error: errorsList
            })
            
        }
        
        
    }

    const token=createToken(postuserstatus._id)
 
    res.cookie('jwt',token,{
        // httpOnly: true,
        maxAge: 3* 24 * 60 * 60 *1000,
         // 3 days in ms
         secure:true,
         SameSite: 'None',
         Domain:"journl-mu.vercel.app",
    })
    return res.status(201).json(postuserstatus.userName)

}

function createToken(id){
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: 3* 24 * 60 * 60, //3 days in seconds
    }); 
}

async function httpUpdateUser(req,res){
    const userDetails=req.body;

    if(!userDetails.userName){
        return res.status(400).json({
            error:"Missing UserName field..."
        })
    }
   const {_id,userName,firstName,lastName,profilePicture,followers,following,Tracks}= await updateUser(userDetails)



    return res.status(201).json({_id,userName,firstName,lastName,profilePicture,followers,following,Tracks})

}



async function httpGetFeed(req,res){ 
    const userDetails=req.body;
    if(!userDetails.userName){
        return res.status(400).json({
            error:"Missing UserName field..."
        })
    }
    const userFromDB=await getUser(userDetails.userName)
    const followingFromDB=userFromDB.following;
    
    const tracksFromfollowing=[]
    for(const person of followingFromDB){
        const eachFollowingFromDB=await getUser(person)
        tracksFromfollowing.push(eachFollowingFromDB.Tracks);
        
    }
    const postsOfTracks=[]
    const flattenedTracksFromfollowing=tracksFromfollowing.flatMap((el)=> el)

    for(const track of flattenedTracksFromfollowing){
        
            const eachTrackFromDB=await getTrack(track)
            postsOfTracks.push(eachTrackFromDB.posts);
    
        
       
    }

    const yourFeed=[]
    const flattenedPostsOfTracks=postsOfTracks.flatMap((el)=> el)

    for(const post of flattenedPostsOfTracks){

            const eachPostFromDB=await getPost(post)
            const userOfPost=await getUser(eachPostFromDB.userName)
            eachPostFromDB._doc.pfp=userOfPost.profilePicture;

            const timestamp = eachPostFromDB._id.toString().substring(0,8)
            const date = new Date( parseInt( timestamp, 16 ) * 1000 )
            eachPostFromDB._doc.time=date;

            yourFeed.push(eachPostFromDB);
        
       
    }
    
    return res.status(200).json({
        yourFeed,
    })
}

async function httpGetOtherUserInfo(req,res){
    const userDetails=req.body;
    if(!userDetails.userName){
        return res.status(400).json({
            error:"Missing UserName field..."
        })
    }
   
    const {userName,firstName,lastName,profilePicture,followers,following,Tracks}=await getUser(userDetails.userName)
    return res.status(200).json({userName,firstName,lastName,profilePicture,followers,following,Tracks})
}

export {httpLoginUser , httpPostUser ,httpUpdateUser ,httpGetFeed, httpGetOtherUserInfo}








            
    // const data = [
    //     {
    //       userName: "user1",
    //       firstName: "John",
    //       lastName: "Doe",
    //       password: "password1",
    //       profilePicture: "https://picsum.photos/id/1",
    //       followers: ["user2", "user3"],
    //       following: ["user4", "user5"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user2",
    //       firstName: "Jane",
    //       lastName: "Smith",
    //       password: "password2",
    //       profilePicture: "https://picsum.photos/id/2",
    //       followers: ["user1", "user3"],
    //       following: ["user5", "user6"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user3",
    //       firstName: "Alice",
    //       lastName: "Johnson",
    //       password: "password3",
    //       profilePicture: "https://picsum.photos/id/3",
    //       followers: ["user1", "user2"],
    //       following: ["user6", "user7"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user4",
    //       firstName: "Bob",
    //       lastName: "Anderson",
    //       password: "password4",
    //       profilePicture: "https://picsum.photos/id/4",
    //       followers: ["user1"],
    //       following: ["user7"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user5",
    //       firstName: "Sarah",
    //       lastName: "Wilson",
    //       password: "password5",
    //       profilePicture: "https://picsum.photos/id/5",
    //       followers: ["user1", "user2"],
    //       following: ["user8"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user6",
    //       firstName: "Michael",
    //       lastName: "Brown",
    //       password: "password6",
    //       profilePicture: "https://picsum.photos/id/6",
    //       followers: ["user3"],
    //       following: ["user9"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user7",
    //       firstName: "Emily",
    //       lastName: "Davis",
    //       password: "password7",
    //       profilePicture: "https://picsum.photos/id/7",
    //       followers: ["user3", "user4"],
    //       following: ["user10"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user8",
    //       firstName: "David",
    //       lastName: "Taylor",
    //       password: "password8",
    //       profilePicture: "https://picsum.photos/id/8",
    //       followers: ["user5"],
    //       following: ["user10"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user9",
    //       firstName: "Olivia",
    //       lastName: "Thomas",
    //       password: "password9",
    //       profilePicture: "https://picsum.photos/id/9",
    //       followers: ["user6"],
    //       following: ["user10"],
    //       Tracks: []
    //     },
    //     {
    //       userName: "user10",
    //       firstName: "James",
    //       lastName: "Walker",
    //       password: "password10",
    //       profilePicture: "https://picsum.photos/id/10",
    //       followers: ["user7", "user8", "user9"],
    //       following: ["user1", "user2", "user3"],
    //       Tracks: []
    //     }
    //   ];
      
    //   data.map(async(el)=>{
    //     await httpPostUser(el)
     
    //   })