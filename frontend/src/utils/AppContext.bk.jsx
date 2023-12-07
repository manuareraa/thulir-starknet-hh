import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import Loading from "../components/loader/Loading";

import {
  StarknetConfig,
  InjectedConnector,
} from "@starknet-react/core";

const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ];

  const [appState, setAppState] = useState({
    loggedIn: false,
  });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {}, []);

  return (
    <StarknetConfig connectors={connectors}>
      <AppContext.Provider
        value={{
          loading,
          setLoading,
          loadingText,
          setLoadingText,
          appState,
          setAppState,
        }}
      >
        <Toaster />
        {loading === true ? (
          <Loading />
        ) : (
          <>
            {/* <Navbar /> */}
            {children}

            {/* <Footer /> */}
          </>
        )}
      </AppContext.Provider>
    </StarknetConfig>
  );
};

export const useAppContext = () => useContext(AppContext);
