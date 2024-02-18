import User from "../users/users.mongo.js";
import Message from "./message.mongo.js";

async function postMessage(messageDetails){
    var messageStatus= (await (await (await Message.create(messageDetails)).populate('sender','-password')).populate('chat'))

    messageStatus= await User.populate(messageStatus,{path:'sender',select:'-password'})
    return messageStatus
  
  }

  // function to get all messages of a chat
async function getAllMessages(messageDetails){
    const messageStatus= await Message.find({
      chat:messageDetails.chatId
    }).populate('sender','-password').populate('chat')
    return messageStatus
  
  }

  export {postMessage,getAllMessages}