
import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    trackName:{
        type:String,
        required:true
    },
    mediaPicture:{
        type:String,
        default:'',
    },
    caption:{
        type:String,
        default:''
    },
    likes:{
        type:[],
        default:[]
    },
    comments:{
        type:[],
        default:[]
    }
},
{timeStamps:true})

const post=mongoose.model('post',postSchema)
export default post
