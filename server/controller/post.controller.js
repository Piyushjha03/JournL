import { getPost ,postPost, updatePost} from "../models/posts/posts.model.js"
import { getTrack, updateTrack } from "../models/tracks/tracks.model.js"
import { getUser } from "../models/users/users.model.js"
async function httpGetPost(req,res){
    const id= req.params.id
   const getPostStatus= await getPost(id)
   if(!getPostStatus){
    return res.status(404).json({
        error:"Post Not Found"
    })
   }
   return res.status(200).json(getPostStatus)
}

async function httpPostPost(req,res){

    
    const postDetails=req.body;
    console.log(postDetails);

    if(!postDetails.userName || !postDetails.trackName){
        return res.status(400).json({
            error:"Missing required fields..."
        })
    }

    const validUser= await getUser(postDetails.userName)
    const validTrack= await getTrack(postDetails.trackName)

    if(!validUser || !validTrack){
        return res.status(400).json({
            error:"Invalid User or Track"
        })
    }


   const postPostStatus= await postPost(postDetails)

 const getPostAfterUpdate= await updateTrack({
    trackName:postPostStatus.trackName,
    posts:postPostStatus._id
}
)


    return res.status(201).json({
        getPostAfterUpdate
    })

}

async function httpUpdatePost(req,res){
    const postInfo=req.body;
    if(!postInfo.postDetails._id){
        return res.status(400).json({
            error:"Missing PostId field..."
        })
    }
   const updatePostStatus= await updatePost(postInfo.postDetails)


    return res.status(201).json(updatePostStatus)

}


export {httpGetPost , httpPostPost ,httpUpdatePost}









  

// const postTObeFed= [
//       {
//         userName: "user1",
//         trackName: "Track 01",
//         mediaPicture: "https://picsum.photos/id/100",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user1",
//         trackName: "Track 01",
//         mediaPicture: "https://picsum.photos/id/101",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user1",
//         trackName: "Track 01",
//         mediaPicture: "https://picsum.photos/id/102",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user1",
//         trackName: "Track 02",
//         mediaPicture: "https://picsum.photos/id/103",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user1",
//         trackName: "Track 02",
//         mediaPicture: "https://picsum.photos/id/104",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user1",
//         trackName: "Track 02",
//         mediaPicture: "https://picsum.photos/id/105",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user2",
//         trackName: "Track 03",
//         mediaPicture: "https://picsum.photos/id/106",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user2",
//         trackName: "Track 03",
//         mediaPicture: "https://picsum.photos/id/107",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user2",
//         trackName: "Track 03",
//         mediaPicture: "https://picsum.photos/id/108",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user2",
//         trackName: "Track 04",
//         mediaPicture: "https://picsum.photos/id/109",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user2",
//         trackName: "Track 04",
//         mediaPicture: "https://picsum.photos/id/110",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user2",
//         trackName: "Track 04",
//         mediaPicture: "https://picsum.photos/id/111",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user3",
//         trackName: "Track 05",
//         mediaPicture: "https://picsum.photos/id/112",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user3",
//         trackName: "Track 05",
//         mediaPicture: "https://picsum.photos/id/113",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user3",
//         trackName: "Track 05",
//         mediaPicture: "https://picsum.photos/id/114",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user3",
//         trackName: "Track 06",
//         mediaPicture: "https://picsum.photos/id/115",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user3",
//         trackName: "Track 06",
//         mediaPicture: "https://picsum.photos/id/116",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user3",
//         trackName: "Track 06",
//         mediaPicture: "https://picsum.photos/id/117",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user4",
//         trackName: "Track 07",
//         mediaPicture: "https://picsum.photos/id/118",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user4",
//         trackName: "Track 07",
//         mediaPicture: "https://picsum.photos/id/119",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user4",
//         trackName: "Track 07",
//         mediaPicture: "https://picsum.photos/id/120",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user4",
//         trackName: "Track 08",
//         mediaPicture: "https://picsum.photos/id/121",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user4",
//         trackName: "Track 08",
//         mediaPicture: "https://picsum.photos/id/122",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user4",
//         trackName: "Track 08",
//         mediaPicture: "https://picsum.photos/id/123",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user5",
//         trackName: "Track 09",
//         mediaPicture: "https://picsum.photos/id/124",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user5",
//         trackName: "Track 09",
//         mediaPicture: "https://picsum.photos/id/125",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user5",
//         trackName: "Track 09",
//         mediaPicture: "https://picsum.photos/id/126",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user5",
//         trackName: "Track 10",
//         mediaPicture: "https://picsum.photos/id/127",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user5",
//         trackName: "Track 10",
//         mediaPicture: "https://picsum.photos/id/128",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user5",
//         trackName: "Track 10",
//         mediaPicture: "https://picsum.photos/id/129",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user6",
//         trackName: "Track 11",
//         mediaPicture: "https://picsum.photos/id/130",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user6",
//         trackName: "Track 11",
//         mediaPicture: "https://picsum.photos/id/131",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user6",
//         trackName: "Track 11",
//         mediaPicture: "https://picsum.photos/id/132",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user6",
//         trackName: "Track 12",
//         mediaPicture: "https://picsum.photos/id/133",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user6",
//         trackName: "Track 12",
//         mediaPicture: "https://picsum.photos/id/134",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user6",
//         trackName: "Track 12",
//         mediaPicture: "https://picsum.photos/id/135",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user7",
//         trackName: "Track 13",
//         mediaPicture: "https://picsum.photos/id/136",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user7",
//         trackName: "Track 13",
//         mediaPicture: "https://picsum.photos/id/137",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user7",
//         trackName: "Track 13",
//         mediaPicture: "https://picsum.photos/id/138",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user7",
//         trackName: "Track 14",
//         mediaPicture: "https://picsum.photos/id/139",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user7",
//         trackName: "Track 14",
//         mediaPicture: "https://picsum.photos/id/140",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user7",
//         trackName: "Track 14",
//         mediaPicture: "https://picsum.photos/id/141",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user8",
//         trackName: "Track 15",
//         mediaPicture: "https://picsum.photos/id/142",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user8",
//         trackName: "Track 15",
//         mediaPicture: "https://picsum.photos/id/143",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user8",
//         trackName: "Track 15",
//         mediaPicture: "https://picsum.photos/id/144",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user8",
//         trackName: "Track 16",
//         mediaPicture: "https://picsum.photos/id/145",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user8",
//         trackName: "Track 16",
//         mediaPicture: "https://picsum.photos/id/146",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user8",
//         trackName: "Track 16",
//         mediaPicture: "https://picsum.photos/id/147",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user9",
//         trackName: "Track 17",
//         mediaPicture: "https://picsum.photos/id/148",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user9",
//         trackName: "Track 17",
//         mediaPicture: "https://picsum.photos/id/149",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user9",
//         trackName: "Track 17",
//         mediaPicture: "https://picsum.photos/id/150",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user9",
//         trackName: "Track 18",
//         mediaPicture: "https://picsum.photos/id/151",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user9",
//         trackName: "Track 18",
//         mediaPicture: "https://picsum.photos/id/152",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user9",
//         trackName: "Track 18",
//         mediaPicture: "https://picsum.photos/id/153",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user10",
//         trackName: "Track 19",
//         mediaPicture: "https://picsum.photos/id/154",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user10",
//         trackName: "Track 19",
//         mediaPicture: "https://picsum.photos/id/155",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user10",
//         trackName: "Track 19",
//         mediaPicture: "https://picsum.photos/id/156",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user10",
//         trackName: "Track 20",
//         mediaPicture: "https://picsum.photos/id/157",
//         caption: "Post 1",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user10",
//         trackName: "Track 20",
//         mediaPicture: "https://picsum.photos/id/158",
//         caption: "Post 2",
//         likes: [],
//         comments: []
//       },
//       {
//         userName: "user10",
//         trackName: "Track 20",
//         mediaPicture: "https://picsum.photos/id/159",
//         caption: "Post 3",
//         likes: [],
//         comments: []
//       }
//     ]


// postTObeFed.map(async(post1)=>{
// await httpPostPost(post1)

// })