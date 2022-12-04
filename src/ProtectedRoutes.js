/////////// IMPORTS
///

import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ProtectedRoutes = ()=>{
/////////// VARIABLES
///

///
/////////// CUSTOM HOOKS
///
const user = useSelector((state) => state.userReducer.userData)
///
/////////// STATES
///

///
/////////// SIDE EFFECTS
///

///
/////////// IF CASES
///

///
/////////// EVENTS
///

///
/////////// FUNCTIONS
///

///
return user ? <Outlet /> : <Navigate to='/welcome' replace />
}