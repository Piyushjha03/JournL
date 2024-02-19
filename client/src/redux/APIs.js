import axios from 'axios';

const API_URL = 'https://journl-server.up.railway.app/';
axios.defaults.withCredentials = true;

async function httpPostUser(userDetails){
    try {
      const response = await axios.post(`${API_URL}/signup`,userDetails);
      return await response.data;
    } catch (error) {
      throw await error.response.data;
    }
  
  }
  async function httpGetUser(userDetails) {
 
    try {
      const response = await axios.post(`${API_URL}/login`,userDetails);
      return await response.data;
    } catch (error) {
      console.log(error);
      throw await error.response.data;
    }
  }

  // for posts in feed
  async function httpGetFeed(userDetails) {
 
    try {
      const response = await axios.post(`${API_URL}/feed`,userDetails);
      return await response.data;
    } catch (error) {
      console.log(error);
      throw await error.response.data;
    }
  }

  // for updating posts
  async function httpUpdateFeed(userDetails) {
 
    try {
      const response = await axios.patch(`${API_URL}/post`,userDetails);
      return await response.data;
    } catch (error) {
      throw await error.response.data;
    }
  }

  // for getting track info

  async function httpGetTrack(trackName) {
 
    try {
      const response = await axios.get(`${API_URL}/track/${trackName}`);
      return await response.data;
    } catch (error) {
      throw await error.response.data;
    }
  }

  // update user
  async function httpUpdateUser(userDetails) {
    try {
      const response = await axios.patch(`${API_URL}/`,userDetails);
      return await response.data;
    } catch (error) {
      throw await error.response.data;
    }
  }

  // add track
  async function httpPostTrack(trackDetails) {
    try {
      const response = await axios.post(`${API_URL}/track`,trackDetails);
      return await response.data;
    } catch (error) {
      throw await (error.response.data) ;
    }
  }

  // get posts of a track
  async function httpGetPostsByTrack(trackDetails) {
    try {
      const response = await axios.post(`${API_URL}/track/trackFeed`,trackDetails);
      return await response.data;
    } catch (error) {
      throw await error.response.data;
    }
  }

  // add post
  async function httpPostPost(postDetails){
    console.log(postDetails);
    try {
      const response = await axios.post(`${API_URL}/post`,postDetails);
      return await response.data;
    } catch (error) {
      throw await error.response.data;
    }
  
  }

  // get other user info
  async function httpGetOtherUserInfo(userDetails){
    try {
      const response = await axios.post(`${API_URL}/otheruser`,userDetails);
      return await response.data;
    } catch (error) {
      throw await error.response.data;
    }
  }

  // fetch all chats of a user

  async function httpGetAllChat(chatInfo){
    try {
      const response=await axios.post(`${API_URL}/chat/getAllChat`,chatInfo)
      return await response.data
    } catch (error) {
      throw await error.response.data
    }
  }
  

  // get all message of a chat

  async function httpGetAllMessage(messageInfo){
    try {
      const response=await axios.post(`${API_URL}/message/getAllMessages`,messageInfo)
      return await response.data
    } catch (error) {
      throw await error.response.data
    }
  }

  // send message
  async function httpSendMessage(messageInfo){
    try {
      const response=await axios.post(`${API_URL}/message/send`,messageInfo)
      return await response.data
    } catch (error) {
      throw await error.response.data
    }
  }

  // get other user info
  async function httpGetOtherUser(userDetails) {
 
    try {
      const response = await axios.post(`${API_URL}/otheruser`,userDetails);
      return await response.data;
    } catch (error) {
      console.log(error);
      throw await error.response.data;
    }
  }

  export {httpPostUser ,httpGetUser,httpGetFeed ,httpUpdateFeed,httpGetTrack,httpUpdateUser,httpPostTrack,httpGetPostsByTrack,httpPostPost,httpGetOtherUserInfo,httpGetAllChat,httpGetAllMessage,httpSendMessage,httpGetOtherUser}