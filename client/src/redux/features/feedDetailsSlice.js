import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { httpGetFeed , httpUpdateFeed} from '../APIs.js';

const initialState = {
  feed:{},
  status:'idle',
  error:[]
}


// create action 

export const getFeed = createAsyncThunk('getFeed',async(userDetails, {rejectWithValue})=>{
    
  try {

    const response = await httpGetFeed(userDetails);

    return response
  } catch (error) {
    return rejectWithValue(error)
  }

})

// update feed
export const updateFeed = createAsyncThunk('updateFeed',async(userDetails, {rejectWithValue})=>{
    
  try {

    const response = await httpUpdateFeed(userDetails);

    return response
  } catch (error) {
    return rejectWithValue(error)
  }

})







export const feedDetailsSlice = createSlice({
  name: 'feedDetails',
  initialState,
  reducers:{
    postFeedPending(){
      console.log("Pending");
    },
    postFeedSuccess(){
      console.log("success");
    },
    postFeedFailed(){
      console.log("failed");
    },
    postFeedIdle(state){
      state.status='idle';
    },
  }
  ,
  extraReducers: (builder)=>{
    builder
    .addCase(getFeed.pending, (state) => {
        state.status='pending'
      })
    .addCase(getFeed.fulfilled, (state,actions) => {
        state.feed=actions.payload;
        state.status='fulfilled'
      })
    .addCase(getFeed.rejected, (state,actions) => {
        state.error=actions.payload
          state.status='error'
    })
    .addCase(updateFeed.pending, (state) => {
        state.status='pending'
      })
    .addCase(updateFeed.fulfilled, (state,actions) => {
      const idx=state.feed.yourFeed.findIndex(obj=>obj._id===actions.payload._id)
      for(let key in actions.payload){
        state.feed.yourFeed[idx][key] = actions.payload[key];
      }
    
        state.status='fulfilled'
      })
    .addCase(updateFeed.rejected, (state,actions) => {
        state.error=actions.payload
          state.status='error'
    })
    
  }
},)


export const {postFeedFailed,postFeedIdle,postFeedPending,postFeedSuccess}=feedDetailsSlice.actions

export default feedDetailsSlice.reducer