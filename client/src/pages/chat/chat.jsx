import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './chat.module.css';
import { PiChatCircle, PiHouseDuotone } from 'react-icons/pi';
import { RiSearch2Line } from 'react-icons/ri';
import { HiOutlineBellAlert } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { httpGetAllChat } from '../../redux/APIs';
import { FiUser } from 'react-icons/fi';
import { IoAddCircleOutline } from 'react-icons/io5';
import { IoChevronBackCircleSharp } from "react-icons/io5";



export const Chat = () => {
    const loc=useLocation();
    const [currentPath,setCurrentPath]=useState(loc.pathname)
    const user=useSelector(state=>state.userDetailsSlice.userInfo)
    const [chatUserInfo,setChatUserInfo]=useState([])
    const [isOnMobile,setIsOnMobile]=useState(false)
    function handleNav(e){
        setCurrentPath(e);
    }

    useEffect(()=>{
        setCurrentPath(loc.pathname)
    },[loc])
    const navigate=useNavigate()



    useEffect(()=>{
        const fetchallchats=async()=>{
            const res= await httpGetAllChat({_id:user._id})
            setChatUserInfo(res.getChatStatus)
           }
        fetchallchats()
       
    },[])

    useEffect(()=>{
        if(window.innerWidth<500){
            setIsOnMobile(true)
        }
    },[window.innerWidth])
  return (
    <>
    <div className={styles.chatPage_wrapper}>
        <div className={styles.chat_nav}>
            <div className={styles.main_nav}>
                <div className={styles.main_nav_content}>
                <div className={styles.navbar_wrapper}>
                <div className={styles.navbar_content}>
                    <div className={styles.navbar_logo} onClick={()=>{
                        
                            navigate('/')
                        }}>
                                logo
                    </div>
                    <div className={styles.navbar_options}>
                        <div className={`${styles.navbar_home} ${currentPath==='/' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/')
                            navigate('/')
                        }}>
                             <div className={styles.home_hover}>
                             <div className={styles.home_content}>
                                <div className={styles.home_icon}>
                                <PiHouseDuotone />
                                </div>
                                <div className={styles.home_name}>
                                    Home
                                </div>
                            </div>
                             </div>
                            
                        </div>
                        <div className={`${styles.navbar_search} ${currentPath==='/search' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/search')
                            navigate('/search')
                        }}>
                             <div className={styles.search_hover}>
                             <div className={styles.search_content}>
                                <div className={styles.search_icon}>
                                <RiSearch2Line />

                                </div>
                                <div className={styles.search_name}>
                                    Search
                                </div>
                            </div>
                             </div>
                                
                        </div>
                        <div className={`${styles.navbar_account} ${currentPath==='/myAccount' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/myAccount')
                            navigate('/myAccount')
                        }}>
                             <div className={styles.account_hover}>
                             <div className={styles.account_content}>
                                <div className={styles.account_icon}>
                                <FiUser />

                                </div>
                                <div className={styles.account_name}>
                                    Account
                                </div>
                            </div>
                             </div>
                                
                        </div>
                        <div className={`${styles.navbar_chat} ${currentPath==='/chat' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/chat')
                            navigate('/chat')
                        }}>
                             <div className={styles.chat_hover}>
                             <div className={styles.chat_content}>
                                <div className={styles.chat_icon}>
                                <PiChatCircle />

                                </div>
                                <div className={styles.chat_name}>
                                    chat
                                </div>
                            </div>
                             </div>
                                
                        </div>
                        <div className={`${styles.navbar_create} ${currentPath==='/create' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/create')
                            navigate('/create')
                        }}>
                             <div className={styles.create_hover}>
                             <div className={styles.create_content}>
                                <div className={styles.create_icon}>
                                <IoAddCircleOutline />

                                </div>
                                <div className={styles.create_name}>
                                    create
                                </div>
                            </div>
                             </div>
                                
                        </div>
                    </div>
     
                </div>
            </div>
                </div>
            </div>
            <div className={styles.profile_nav}>
                <div className={styles.profile_nav_content}>
                    <div className={styles.profile_nav_wrapper}>
                        
                        {chatUserInfo.map( e=>{
                            const usertoMssg=e.users[0]._id===user._id ? e.users[1] : e.users[0]

                            return(
                                <>
                                <div className={styles.eachProfile} onClick={()=>{navigate(`/chat/${usertoMssg.userName}`, {state:e})}}>
                                    <div className={styles.eachProfile_pfp}>
                                        <img src={`${usertoMssg.profilePicture}/60`} alt="" />
                                    </div>
                                    <div className={styles.eachProfile_info}>
                                        <div className={styles.eachProfile_username}>
                                        {usertoMssg.userName}
                                        </div>
                                        <div className={styles.eachProfile_lastmessage}>
                                        {e.latestMessage.content}
                                        </div>
                                    </div>
                                </div>
                            
                                </>
    
                            )
                           
                            
                        })}
                            
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.chat_main}>
            <div className={styles.chat_main_new}>
            <Outlet /> 
            </div>
           
        </div>
        {isOnMobile ?
    <>
    {currentPath==='/chat' || currentPath==='/chat/' ?
    <>
        <div className={styles.mobile_chat}>
            <div className={styles.main_nav}>
                <div className={styles.main_nav_content}>
                <div className={styles.navbar_wrapper}>
                <div className={styles.navbar_content}>
                    <div className={styles.navbar_logo} onClick={()=>{
                        
                            navigate('/')
                        }}>
                                logo
                    </div>
                    <div className={styles.navbar_options}>
                        <div className={`${styles.navbar_home} ${currentPath==='/' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/')
                            navigate('/')
                        }}>
                             <div className={styles.home_hover}>
                             <div className={styles.home_content}>
                                <div className={styles.home_icon}>
                                <PiHouseDuotone />
                                </div>
                                <div className={styles.home_name}>
                                    Home
                                </div>
                            </div>
                             </div>
                            
                        </div>
                        <div className={`${styles.navbar_search} ${currentPath==='/search' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/search')
                            navigate('/search')
                        }}>
                             <div className={styles.search_hover}>
                             <div className={styles.search_content}>
                                <div className={styles.search_icon}>
                                <RiSearch2Line />

                                </div>
                                <div className={styles.search_name}>
                                    Search
                                </div>
                            </div>
                             </div>
                                
                        </div>
                        <div className={`${styles.navbar_account} ${currentPath==='/myAccount' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/myAccount')
                            navigate('/myAccount')
                        }}>
                             <div className={styles.account_hover}>
                             <div className={styles.account_content}>
                                <div className={styles.account_icon}>
                                <FiUser />

                                </div>
                                <div className={styles.account_name}>
                                    Account
                                </div>
                            </div>
                             </div>
                                
                        </div>
                        <div className={`${styles.navbar_chat} ${currentPath==='/chat' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/chat')
                            navigate('/chat')
                        }}>
                             <div className={styles.chat_hover}>
                             <div className={styles.chat_content}>
                                <div className={styles.chat_icon}>
                                <PiChatCircle />

                                </div>
                                <div className={styles.chat_name}>
                                    chat
                                </div>
                            </div>
                             </div>
                                
                        </div>
                        <div className={`${styles.navbar_create} ${currentPath==='/create' ? styles.activeElement : '' }`} onClick={()=>{
                            handleNav('/create')
                            navigate('/create')
                        }}>
                             <div className={styles.create_hover}>
                             <div className={styles.create_content}>
                                <div className={styles.create_icon}>
                                <IoAddCircleOutline />

                                </div>
                                <div className={styles.create_name}>
                                    create
                                </div>
                            </div>
                             </div>
                                
                        </div>
                    </div>
     
                </div>
            </div>
                </div>
            </div>
            <div className={styles.profile_nav}>
                <div className={styles.profile_nav_content}>
                    <div className={styles.profile_nav_wrapper}>
                        
                        {chatUserInfo.map( e=>{
                            const usertoMssg=e.users[0]._id===user._id ? e.users[1] : e.users[0]

                            return(
                                <>
                                <div className={styles.eachProfile} onClick={()=>{navigate(`/chat/${usertoMssg.userName}`, {state:e})}}>
                                    <div className={styles.eachProfile_pfp}>
                                        <img src={`${usertoMssg.profilePicture}/60`} alt="" />
                                    </div>
                                    <div className={styles.eachProfile_info}>
                                        <div className={styles.eachProfile_username}>
                                        {usertoMssg.userName}
                                        </div>
                                        <div className={styles.eachProfile_lastmessage}>
                                        {e.latestMessage.content}
                                        </div>
                                    </div>
                                </div>
                            
                                </>
    
                            )
                           
                            
                        })}
                            
                    </div>
                </div>
            </div>
            <div className={styles.mobile_chat}>
        <div className={styles.chat_main_new}>
        <Outlet /> 
        </div>
    </div>
        </div>
       
    </>
    :
    <>
    <div className={styles.mobile_chat}>
        <div className={styles.backLogo} onClick={()=>navigate('/chat')}>
            <IoChevronBackCircleSharp/>
        </div>
            <div className={styles.chat_main_new}>
            <Outlet /> 
            </div>
      
    </div>
    </>

    }
     
    </>
     :
     null}
    </div>
    
    </>
    
  );
};


