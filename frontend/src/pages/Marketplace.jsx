import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { useAppContext } from "../utils/AppContext";

import imgOne from "../assets/forests/1.jpg";
import imgTwo from "../assets/forests/2.jpg";
import imgThree from "../assets/forests/3.jpg";
import imgFour from "../assets/forests/4.jpg";
import imgFive from "../assets/forests/5.jpg";
import imgSix from "../assets/forests/6.jpg";
import imgSeven from "../assets/forests/7.jpg";
import imgEight from "../assets/forests/8.jpg";
import imgNine from "../assets/forests/9.jpg";
import imgTen from "../assets/forests/10.jpg";
import imgEleven from "../assets/forests/11.jpg";

function Marketplace(props) {
  const randomImage = () => {
    const images = [
      imgOne,
      imgTwo,
      imgThree,
      imgFour,
      imgFive,
      imgSix,
      imgSeven,
      imgEight,
      imgNine,
      imgTen,
      imgEleven,
    ];
    const randomIndex = Math.floor(Math.random() * 11);
    return images[randomIndex];
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* credits container */}
      <div className="w-full py-2">
        <p className="text-2xl font-bold text-center">Marketplace</p>
        <div className="divider"></div>
      </div>

      <div className="flex flex-col w-full">
        {/* asset for sale */}
        <div className="my-2">
          <p className="text-2xl font-bold">Assets for Sale</p>
        </div>
        <div className="flex flex-row items-center">
          
            {/* one card */}
          <div className="w-fit">
            <Card isFooterBlurred radius="lg" className="border-none">
              <img
                alt="Woman listing to music"
                className="object-cover shadow-lg w-80 h-80"
                height={400}
                src={randomImage()}
                // src={randomImages[asset.id]}
                width={400}
              />
              <CardFooter className="flex flex-col justify-start items-start before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-lg font-bold text-white">Asset Name</p>
                {/* location */}
                {/* <div className="flex flex-row items-center justify-start gap-x-2">
                        <img src={location} alt="" className="w-4 h-4" />
                        <p className="text-sm text-white/60">Location</p>
                      </div> */}
                <div className="py-0 my-0 divider after:bg-white before:bg-white"></div>
                <div className="flex flex-row items-end py-2 gap-x-4">
                  <p className="text-xl font-bold leading-none text-white">
                    500 Carbon Credits
                  </p>
                  <p className="text-sm text-white/60"> / per month</p>
                </div>
                <div className="flex flex-row items-center justify-center w-full py-2 gap-x-4">
                  <Button
                    className="text-white text-tiny bg-white/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                    // onPress={() => {
                    //   setStatModal(true);
                    //   setSelectedAsset(asset);
                    // }}
                  >
                    View Stats
                  </Button>
                  <Button
                    className="text-white text-tiny bg-white/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                    onPress={() => {
                      navigate("/marketplace");
                    }}
                  >
                    Transfer
                  </Button>
                  <div>
                    <p></p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
