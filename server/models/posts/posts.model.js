import post from "./posts.mongo.js"


async function getPost(id){
  const postStatus= await post.findOne({
        _id:id
    },{})

    return postStatus
}


async function postPost(postDetails){
    try {
   const postPostStatus= await post.create(postDetails)
    return(postPostStatus)
    } catch (error) {
       return(error)
    }
  }


  async function updatePost(postDetails){
    try {
     
   const updatePostStatus= await post.findOneAndUpdate(
   {
    _id:postDetails._id
   },
   {
    $set:{
      mediaPicture:postDetails.mediaPicture,
      caption:postDetails.caption,
    },
    $push:{
      likes:postDetails.likes,
      comments:postDetails.comments,
    },
    $pull:{
      likes: postDetails.likestoRemove,
      comments:postDetails.commentstoRemove,        
    }
   },
   {
    new:true
   }
    )
  return(updatePostStatus)
    } 
    
    catch (error) {
       return(error)
    }
  } 






 export {getPost, postPost , updatePost}