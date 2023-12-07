// import TypeWriterText from "../animations/TypeWriterText";

import loadingAnimation from "../../assets/svg/loading.svg";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-indigo-400">
      <img src={loadingAnimation} alt="loading" className="w-60 h-60" />
      {/* <TypeWriterText text="Please Wait..." delay={200} infinite /> */}
      <p>Please Wait...</p>
    </div>
  );
}

export default Loading;
