import Chat from "../models/chat/chat.mongo.js"
import { getAllMessages, postMessage } from "../models/message/message.model.js"

async function httpPostMessage(req,res){
    const messageDetails= req.body
    if(!messageDetails.sender || !messageDetails.content || !messageDetails.chat){
        return res.status(400).json({error:'Missing Required Fields'})
    }
    try {
        const postMessageStatus= await postMessage(messageDetails)

        // update last message in Chat model

        await Chat.findByIdAndUpdate(messageDetails.chat,{
            latestMessage:postMessageStatus
        })

        return res.status(200).json({
            postMessageStatus
        })
    } catch (error) {
        return res.status(400).json({
            error:error
        })
    }

}
async function httpGetAllMessage(req,res){
    const messageDetails= req.body
    if(!messageDetails.chatId){
        return res.status(400).json({error:'Missing Required Fields'})
    }
    try {
        const getAllMessageStatus= await getAllMessages(messageDetails)

        return res.status(200).json({
            getAllMessageStatus
        })
    } catch (error) {
        return res.status(400).json({
            error:error
        })
    }

}

export {httpPostMessage,httpGetAllMessage}