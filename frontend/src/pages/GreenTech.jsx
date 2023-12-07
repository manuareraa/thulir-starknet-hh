import React from "react";
import { Button } from "@nextui-org/react";

function GreenTech(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* credits container */}
      <div className="w-full py-2">
        <p className="text-2xl font-bold text-center">Green Technology</p>
        <div className="flex flex-row items-center justify-center w-full pt-4 gap-x-8">
          <Button
            onClick={() => {
              navigate("/marketplace");
            }}
          >
            Add a Green Tech
          </Button>
          <Button
            onClick={() => {
              navigate("/marketplace");
            }}
          >
            Go to Marketplace
          </Button>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col items-center justify-center w-full my-16">
          <p className="">You do not own green technologies</p>
        </div>
      </div>
    </div>
  );
}

export default GreenTech;
