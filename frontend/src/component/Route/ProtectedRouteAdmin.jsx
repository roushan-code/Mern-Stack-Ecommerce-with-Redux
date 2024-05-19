import React from "react";
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

const ProtectedRouteAdmin = ({ isAdmin, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  
    // return (
    //     loading === false &&  (
    //         isAuthenticated === false ? <Navigate to="/login" replace/> : (isAdmin === true && user && user.role !== "admin") ? <Navigate to="/login" replace/> : <Outlet/>
    //     )
    // );
    
    // console.log(loading)
    // console.log(isAuthenticated)
    
    if (loading === false && isAuthenticated) {
        
        if (isAdmin && user && user.role !== "admin") {
            return <Navigate to="/login" replace />;
        } else {
            
            return <Outlet />;
        }
    } else {
        
        return null;
    }
  };
  
  export default ProtectedRouteAdmin;