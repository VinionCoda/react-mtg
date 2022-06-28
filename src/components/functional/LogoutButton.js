import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


const LogoutButton = () => {
    const {logout,isAuthenticated} = useAuth0();
    if(isAuthenticated && localStorage.getItem("User") !== null){
        localStorage.removeItem("User");
        }
    return (
        isAuthenticated && (
     <button onClick={()=>{logout()}}
     className="btn btn-danger"
     >
         Log Out
     </button>
        )
    )
}

export default LogoutButton