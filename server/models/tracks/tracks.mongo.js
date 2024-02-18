
import mongoose from "mongoose";

const trackSchema=new mongoose.Schema({
    trackName:{
        type:String,
        required:true,
        min:2,
        unique:true
    },
    coverPicture:{
        type:String,
        default:''
    },
    discription:{
        type:String,
        default:''
    },
    posts:{
        type:[],
        default:[],
    },
    userName:{
        type:String,
        required:true
    }
},
{timeStamps:true})

const tracks=mongoose.model('tracks',trackSchema)
export default tracks
