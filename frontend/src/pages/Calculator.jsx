import React from "react";

function Calculator(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* credits container */}
      <div className="w-full py-2">
        <p className="text-2xl font-bold text-center">Calculator</p>
        <div className="divider"></div>
        <div className="flex flex-col items-center justify-center w-full my-16 gap-y-4"></div>
      </div>
    </div>
  );
}

export default Calculator;
