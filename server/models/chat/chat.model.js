
import Chat from "./chat.mongo.js";


async function getChat(chatDetails){
  const chatStatus= await Chat.findOne({
    $and:[
        {users:{$elemMatch: { $eq: chatDetails.senderId }}},
        {users:{$elemMatch: { $eq: chatDetails.recipientId }}}
    ]
       
      
    },{}).populate('users','-password ').populate({path:'latestMessage',populate:{path:'sender',select:'-password'}})

    return chatStatus
}
async function getAllChat(chatDetails){
  const chatStatus= await Chat.find({
        users:{$elemMatch: { $eq: chatDetails._id }},
    },{}).populate('users','-password').populate('latestMessage').sort({updatedAt:-1})

    return chatStatus
}



async function postChat(chatDetails){
    try {
       const createdChat= await Chat.create(chatDetails)
       const fullChat= await Chat.findOne({
        _id:createdChat._id
       }).populate('users','-password')
      
       return fullChat
    } catch (error) {
        return(error)
    }
  }



 export {getChat , postChat, getAllChat} 