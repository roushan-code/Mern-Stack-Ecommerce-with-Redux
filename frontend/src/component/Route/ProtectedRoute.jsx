import React from "react";
import { useSelector } from "react-redux";
// import { Navigate,Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ isAdmin, children }) => {
    const { loading, isAuthenticated,user } = useSelector((state) => state.user);
    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/login" /> : isAdmin ? user.role !== "admin" ? <Navigate to="/login" /> : children : children
            )}
        </>
    );
    // Check if loading is false and user is authenticated
    // if (loading === false && isAuthenticated) {
    //     return <Outlet />;
    // } else {
    //     return <Navigate to="/login" replace />;
    // }
  };
  
  export default PrivateRoute;
