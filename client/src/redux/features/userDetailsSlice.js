import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { httpGetUser, httpPostPost, httpPostTrack, httpPostUser, httpUpdateUser } from '../APIs.js';

const initialState = {
  userInfo:{},
  status:'idle',
  error:[]
}


// create action for sign up

export const postUser = createAsyncThunk('postUser',async(userDetails, {rejectWithValue})=>{
    
  try {
    const response = await httpPostUser(userDetails);
    return response
  } catch (error) {
    return rejectWithValue(error)
  }

})

//login action

export const getUser = createAsyncThunk('getUser',async(userDetails, {rejectWithValue})=>{
    
    try {
      const response = await httpGetUser(userDetails);
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  
  })

  // update user action
  export const updateUser = createAsyncThunk('updateUser',async(userDetails, {rejectWithValue})=>{
    try {
      const response = await httpUpdateUser(userDetails);
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  
  })

  // create track
  export const postTrack = createAsyncThunk('postTrack',async(userDetails, {rejectWithValue})=>{
    try {
      const response = await httpPostTrack(userDetails);
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  
  })
  // create posts
  export const postPost = createAsyncThunk('postPost',async(postDetails, {rejectWithValue})=>{
    try {
      const response = await httpPostPost(postDetails);
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  
  })



export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers:{
    postUSerPending(){
      console.log("Pending");
    },
    postUSerSuccess(){
      console.log("success");
    },
    postUSerFailed(){
      console.log("failed");
    },
    postUSerIdle(state){
      state.status='idle';
    },
  }
  ,
  extraReducers: (builder)=>{
    builder
    .addCase(postUser.pending, (state) => {
        state.status='pending'
      })
    .addCase(postUser.fulfilled, (state,actions) => {
        state.userInfo=actions.payload;
        state.status='fulfilled'
      })
    .addCase(postUser.rejected, (state,actions) => {
        state.error=actions.payload
          state.status='error'
    })
    .addCase(getUser.pending, (state) => {
        state.status='pending'
      })
    .addCase(getUser.fulfilled, (state,actions) => {
        state.userInfo=actions.payload;
        state.status='fulfilled'
      })
    .addCase(getUser.rejected, (state,actions) => {
        state.error=actions.payload
          state.status='error'
    })
    .addCase(updateUser.pending, (state) => {
        state.status='pending'
      })
    .addCase(updateUser.fulfilled, (state,actions) => {
        state.userInfo=actions.payload;
        state.status='fulfilled'
      })
    .addCase(updateUser.rejected, (state,actions) => {
        state.error=actions.payload
          state.status='error'
    })
    .addCase(postTrack.pending, (state) => {
        state.status='pending'
      })
    .addCase(postTrack.fulfilled, (state,actions) => {
        state.userInfo=actions.payload;
        state.status='fulfilled'
      })
    .addCase(postTrack.rejected, (state,actions) => {
        state.error=actions.payload
          state.status='error'
    })
    .addCase(postPost.pending, (state) => {
        state.status='pending'
      })
    .addCase(postPost.fulfilled, (state,actions) => {
        // state.userInfo=actions.payload;
        state.status='fulfilled'
      })
    .addCase(postPost.rejected, (state,actions) => {
        state.error=actions.payload
          state.status='error'
    })
  }
},)


export const {postUSerIdle,postUSerFailed, postUSerPending, postUSerSuccess}=userDetailsSlice.actions

export default userDetailsSlice.reducer