import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useAppContext } from "../utils/AppContext";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { connectWallet, appState, disconnectWallet } = useAppContext();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log("UE", appState);
  //   }, []);

  return (
    <div className="flex flex-row items-center justify-between w-full px-12 py-6 bg-green-200">
      <div className="flex flex-row items-center gap-x-14">
        <p className="text-3xl font-bold text-inherit">Project 56P</p>
        {appState.loggedIn === true ? (
          <div className="hidden gap-4 sm:flex">
            <div>
              <Button
                onPress={() => {
                  navigate("/dashboard");
                }}
              >
                Dashboard
              </Button>
            </div>
            <div>
              <Button
                onPress={() => {
                  navigate("/manage-assets");
                }}
              >
                Manage Assets
              </Button>
            </div>
            {/* <div>
              <Button
                onPress={() => {
                  navigate("/green-tech");
                }}
              >
                Green Tech
              </Button>
            </div> */}
            <div>
              <Button
                onPress={() => {
                  navigate("/manage-investments");
                }}
              >
                Manage Investments
              </Button>
            </div>
            <div>
              <Button
                onPress={() => {
                  navigate("/marketplace");
                }}
              >
                Marketplace
              </Button>
            </div>
            {/* <div>
              <Button
                onPress={() => {
                  navigate("/calculator");
                }}
              >
                Calculator
              </Button>
            </div> */}
          </div>
        ) : null}
      </div>
      <div className="">
        {appState.loggedIn === false ? (
          <div className="hidden lg:flex">
            <Button onPress={connectWallet}>Connect Wallet</Button>
          </div>
        ) : (
          <div>
            <div className="flex flex-row items-center gap-x-6">
              <p>
                {appState.address.address.slice(0, 10) +
                  "..." +
                  appState.address.address.slice(-4)}
              </p>
              <Button onPress={disconnectWallet}>Disconnect Wallet</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
