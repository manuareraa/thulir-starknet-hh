import { useState } from "react";
import { Button, ButtonGroupProvider } from "@nextui-org/react";

import "./App.css";
import { AppContextProvider } from "./utils/AppContext";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import PrivateRouteGuard from "./utils/PrivateRouteGuard";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ManageAssets from "./pages/ManageAssets";
import GreenTech from "./pages/GreenTech";
import ManageInvestments from "./pages/ManageInvestments";
import Marketplace from "./pages/Marketplace";
import Calculator from "./pages/Calculator";

function App() {
  const location = useLocation();
  const [count, setCount] = useState(0);

  return (
    <AppContextProvider>
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/" element={<Navigate to="/dashboard/my-farm" />} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRouteGuard>
              <Dashboard />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/manage-assets"
          element={
            <PrivateRouteGuard>
              <ManageAssets />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/green-tech"
          element={
            <PrivateRouteGuard>
              <GreenTech />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/manage-investments"
          element={
            <PrivateRouteGuard>
              <ManageInvestments />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/marketplace"
          element={
            <PrivateRouteGuard>
              <Marketplace />
            </PrivateRouteGuard>
          }
        />
        {/* <Route path="/pathogen/view/:pathogenName" element={<PathogenView />} /> */}
      </Routes>
    </AppContextProvider>
  );
}

export default App;
