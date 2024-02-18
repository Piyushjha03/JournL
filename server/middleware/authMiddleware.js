import jwt from 'jsonwebtoken'
import { getUser } from '../models/users/users.model.js';

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET ,async(err,decodedToken)=>{
            if(err){
                return res.status(404).json({
                    error:"SESSION TIMED OUT"
                });
            }
            else{
               const user= await getUser(req.body.userName)
                if(decodedToken.id===user?._id.toString()){
                    next();
                }
                else{
                    return res.status(404).json({
                        error:"PAGE NOT FOUND"
                    });
                  
                }
            }
        })
    }
    else{
        console.log("redirecting");
        // return res.redirect('/login')
        return res.status(404).json({
            error:"SESSION TIMED OUT"
        });
    }

}

export {requireAuth}