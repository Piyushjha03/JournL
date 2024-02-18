
import { useSelector } from "react-redux/es/hooks/useSelector"
import { Navigate, Outlet, } from "react-router-dom"


export default function ProtectedRoute() {

     const currentUser= useSelector(state=>state?.userDetailsSlice?.userInfo)

     if(currentUser){

      return (
        Object?.keys(currentUser).length > 0  ? <Outlet /> : <Navigate to='/login'/>
    )
     }
     else{
      return(
<Navigate to='/login'/>
      )
      
     }
  
}
