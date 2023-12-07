import React, { useState, useEffect } from "react";
import { useAppContext } from "../utils/AppContext";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  const { appState } = useAppContext();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* credits container */}
      <div className="py-2">
        <p className="text-2xl font-bold text-center">Your Credits</p>
        <div className="divider"></div>

        {/* individual credits container */}
        <div className="flex flex-row gap-x-8">
          <div className="shadow stats">
            <div className="stat place-items-center gap-y-3">
              <div className="stat-title">Green Credits</div>
              <div className="stat-value">
                {appState.userProfile.greenCredits || 0}
              </div>
              <button className="text-white bg-green-700 btn btn-sm">
                Buy Credits
              </button>
            </div>

            <div className="stat place-items-center gap-y-3">
              <div className="stat-title">Volunteer Carbon Credits</div>
              <div className="stat-value">
                {appState.userProfile.greenCredits || 0}
              </div>
              <button className="text-white bg-green-700 btn btn-sm">
                Buy Credits
              </button>
            </div>

            <div className="stat place-items-center gap-y-3">
              <div className="stat-title">Certified Carbon Credits</div>
              <div className="stat-value">
                {appState.userProfile.carbonCredits || 0}
              </div>
              <button className="text-white bg-green-700 btn btn-sm">
                Buy Credits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
