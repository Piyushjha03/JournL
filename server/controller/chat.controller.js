import { getAllChat, getChat, postChat } from "../models/chat/chat.model.js";

async function httpGetChat(req,res){
    const chatDetails= req.body
    if(!chatDetails.senderId || !chatDetails.recipientId){
        return res.status(400).json({error:'Missing Required Fields'})
    }
   const getChatStatus= await getChat(chatDetails)

   if(getChatStatus){
    return res.status(200).json({
        getChatStatus
    })
   }
   else{
   const getChatPostStatus=await postChat({users:[chatDetails.senderId,chatDetails.recipientId]})
    return res.status(200).json({
         getChatPostStatus
    })
   }
}
async function httpGetAllChat(req,res){
    const chatDetails= req.body
    if(!chatDetails._id){
        return res.status(400).json({error:'Missing Required Fields'})
    }
  
   try {
    const getChatStatus= await getAllChat(chatDetails)
    return res.status(200).json({
        getChatStatus
    })
   } catch (error) {
       return res.status(400).json({
           error:error
       })
   }
}

export {httpGetChat,httpGetAllChat}