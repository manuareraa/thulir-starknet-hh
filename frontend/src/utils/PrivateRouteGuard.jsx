// PrivateRouteGuard.js
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

const PrivateRouteGuard = ({ children }) => {
  const { appState } = useAppContext();

  if (appState.loggedIn === true) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRouteGuard;
