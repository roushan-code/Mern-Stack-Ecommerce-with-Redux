import React from "react";
import { useSelector } from "react-redux";
// import { Navigate,Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ isAdmin, children }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    
    // console.log(loading)
    // console.log(isAuthenticated)
    
    // if (loading === false && isAuthenticated) {
        
    //     if (isAdmin && user && user.role !== "admin") {
    //         return <Navigate to="/login" replace />;
    //     } else {
            
    //         return <Outlet />;
    //     }
    // } else {
        
    //     return null;
    // }

    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/login" /> : isAdmin ? user.role !== "admin" ? <Navigate to="/login" /> : children : children
            )}
        </>
    );
  };
  
  export default ProtectedRouteAdmin;