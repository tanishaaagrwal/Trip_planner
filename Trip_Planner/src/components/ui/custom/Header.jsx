import { useEffect, useState } from "react";
import Button from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import axios from "axios";

function Header() {

  const users = JSON.parse(localStorage.getItem('user'));
  const[openDialog, setOpenDialog] = useState(false);
 
  
  useEffect(()=>{
    console.log(users);
  },[])

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

   const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false)
      window.location.reload();
    })

    
  }

  return (
     <div className="fixed top-0 left-0 right-0 w-full bg-white shadow-sm p-2 flex justify-between items-center px-6 z-50">
     <img src="/logo.svg" alt="Logo" className="h-14 w-auto" />
     <div>
      {users ?
      <div className="flex items-center gap-3">
          <a href="/my-trips">
          <Button variant="outline" className="rounded-full">My Trips</Button>
          </a>
      
      <Popover>
          <PopoverTrigger>
            <img src={users?.picture} className="h-[35px] w-[35px] rounded-full "/>
          </PopoverTrigger>
          <PopoverContent><h2 className="cursor-pointer"  onClick={()=>{
            googleLogout();
            localStorage.clear();
            window.location.reload();
           
          }}>Logout</h2></PopoverContent>
     </Popover>
      </div>
       :
    <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
}
</div>
  <Dialog open={openDialog} >
 
  <DialogContent>
    <DialogHeader>
      
     <DialogDescription className="flex flex-col items-center text-center px-6 pb-6">
 <img src="/logo.svg" alt="Trip Buddy Logo" className="w-40 h-30 mb-4" />
<h2 className="text-xl font-semibold text-gray-800 mb-2">Sign in with Google</h2>
 <p className="text-sm text-gray-600 mb-4">Sign in to the app with Google authentication</p>
 <Button
 
  onClick={login}
  variant="outline"
  className="bg-black hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 w-full mt-5"
>
 
  Sign In with Google

</Button>

</DialogDescription>

    </DialogHeader>
  </DialogContent>
</Dialog>

     
 </div>
 );
}
export default Header;
