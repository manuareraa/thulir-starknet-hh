import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useAppContext } from "../utils/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Homepage(props) {
  const { connectWallet, appState } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-row items-center gap-x-8">
        <Button
          onClick={() => {
            if (appState.loggedIn === false) {
              toast.error("Please connect your Wallet");
            } else {
              navigate("/dashboard");
            }
          }}
        >
          Go to Dashboard
        </Button>
        <Button
          onClick={() => {
            navigate("/audit");
          }}
        >
          Audit
        </Button>
      </div>
    </div>
  );
}

export default Homepage;
