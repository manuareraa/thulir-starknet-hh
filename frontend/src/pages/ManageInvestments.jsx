import React from "react";
import { Button } from "@nextui-org/react";

function ManageInvestments(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* credits container */}
      <div className="w-full py-2">
        <p className="text-2xl font-bold text-center">Manage Investments</p>
        <div className="divider"></div>
        <div className="flex flex-col items-center justify-center w-full my-16 gap-y-4">
          <p className="">You haven't invested in any projects</p>
          <Button
            onClick={() => {
              navigate("/marketplace");
            }}
          >
            Go to Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ManageInvestments;
