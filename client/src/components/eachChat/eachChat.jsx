import { useSelector } from 'react-redux';
import styles from './eachChat.module.css';
import { LuSend } from "react-icons/lu";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from "react-icons/bs";
import { useEffect, useState } from 'react';
import {   httpGetAllMessage, httpSendMessage } from '../../redux/APIs';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { socket } from './socket';


export const EachChat = () => {


    const user=useSelector(state=>state.userDetailsSlice.userInfo)
    const [isEmoji,setIsEmoji]=useState(false)
    const [allChat,setAllChat]=useState(null)
    const[message,setMessage]=useState('')  
    const location = useLocation();
    const data = location.state;

    const messageEl=useRef(null)
    useEffect(()=>{
      
      // setSocketState(socket)
      socket.emit('setup',user)
      socket.on('connected',()=>{
        console.log("...connected");
      })
   },[])

    useEffect(()=>{
     async function getAllChat(){
       const chat= await httpGetAllMessage({chatId:data._id});
        setAllChat(chat.getAllMessageStatus);
      }
      getAllChat();

        console.log("...joing room")
        socket.emit('join chat',data._id)
    
      
      
    },[])

   function handleMessage(e){
    setMessage(e.target.value)
   } 
  async function sendMessage(){
    const res=  await httpSendMessage({sender:user._id,content:message,chat:data._id})
    if(socket && res.postMessageStatus)
    {
      socket.emit('new message',{chat:res.postMessageStatus.chat,sender:res.postMessageStatus.sender,content:res.postMessageStatus.content})
    }

    const updatedChat=[...allChat,res.postMessageStatus];
    setAllChat(updatedChat);
    setMessage('')
    document.querySelector("#textIp").value=''
   }

   useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    }
  }, [])

  useEffect(()=>{
      socket.on('message received',(msg)=>{
        if(allChat){
          const updatedChat=[...allChat,msg];
        setAllChat(updatedChat);
        }  
        
      })
    
  });


  return (
    <>
    <div className={styles.innerWrapper}>
               
                <div className={styles.name_heading}>
                    <div className={styles.profilePicture_container}>
                    <img src={`https://www.w3schools.com/html/pic_trulli.jpg`} alt="" />
                    </div>
                    <div className={styles.heading_username}>
                        {user.userName}
                    </div>
                </div>   
                <div className={styles.chat_display} ref={messageEl}>
                  {allChat && allChat.map(e=>{
                    return(
                      <>
                      {e.sender._id===user._id ?
                      <>
                      <div className={styles.chat_display_sent}>
                       <div className={styles.chat_display_sent_content}>
                           {e.content}
                        </div>
                       </div>
                      </>
                       :
                       <>
                       <div className={styles.chat_display_recived}>
                        <div className={styles.chat_display_recived_content}>
                           {e.content}
                        </div>
                     
                      </div>
                       
                       </>
                       }
                      </>
                    )
                  })}
                        
                </div>   
                <div className={styles.keyboardInput}>
                    <div className='emojiPicker' onClick={()=>setIsEmoji(!isEmoji)} >
                            {isEmoji ? <EmojiPicker open={true} theme='dark'/> : <BsEmojiSmile/>}
                    </div>
                    <input id='textIp' className={styles.keyboardInput_text} name='message' type="text" placeholder='Type a message...' onChange={handleMessage} autoComplete='off' />
                    <div className={styles.sendButton} onClick={sendMessage}  ><LuSend/></div>
                </div>   
            </div>
    </>
  );
};

