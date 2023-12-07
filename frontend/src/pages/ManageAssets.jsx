import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { useAppContext } from "../utils/AppContext";

import NewAssetModal from "../components/NewAssetModal";

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

import location from "../assets/svg/location.svg";
import AssetStatModel from "../components/AssetStatModel";
import PriceModal from "../components/PriceModal";

function ManageAssets(props) {
  const { appState } = useAppContext();
  const navigate = useNavigate();
  const { isOpen, onOpenChange, onOpen } = useDisclosure(false);
  const [statModal, setStatModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [priceModal, setPriceModal] = useState(false);
  const [priceTID, setPriceTID] = useState(null);

  const [ccValues, setCCValues] = useState({});

  // randomly return an image from the eleven images
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

  useEffect(() => {
    console.log(">> manage assets", appState);
  }, []);

  const [randomImages, setRandomImages] = useState({});

  useEffect(() => {
    // Generate a random image for each asset and store it in the state
    const imagesForAssets = appState.userProfile.assets.reduce((acc, asset) => {
      acc[asset.id] = randomImage();
      return acc;
    }, {});

    setRandomImages(imagesForAssets);
  }, [appState.userProfile.assets]);

  useEffect(() => {
    const initialCCValues = {};
    appState.userProfile.assets.forEach((asset) => {
      initialCCValues[asset.id] = generateRandomCC();
    });
    setCCValues(initialCCValues);

    // Set up an interval to update CC values every 4 seconds
    const intervalId = setInterval(() => {
      updateCCValues();
    }, 4000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [appState.userProfile.assets]);

  // Function to generate a random CC value
  const generateRandomCC = () => {
    // Assuming the base value for CC is 100, for example
    const baseValue = 100;
    // Generate a random number between -6 and 6 for deviation
    const deviation = Math.floor(Math.random() * 13) - 6;
    return baseValue + deviation;
  };

  // Function to update CC values with a small random deviation
  const updateCCValues = () => {
    setCCValues((currentValues) => {
      const newValues = { ...currentValues };
      Object.keys(newValues).forEach((id) => {
        // Add a deviation of +/- 6 to the current value
        const deviation = Math.floor(Math.random() * 13) - 6;
        newValues[id] = newValues[id] + deviation;
        // Ensure the new value is within your desired range
        // if you have a specific range for CC values
      });
      return newValues;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* modals */}
      <NewAssetModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <AssetStatModel
        isOpen={statModal}
        onOpenChange={onOpenChange}
        setStatModal={setStatModal}
        selectedAsset={selectedAsset}
      />
      <PriceModal
        isOpen={priceModal}
        onOpenChange={onOpenChange}
        setPriceModal={setPriceModal}
        tokenUID={priceTID}
      />
      {/* credits container */}
      <div className="w-full py-2">
        <p className="text-2xl font-bold text-center">Manage Assets</p>
        <div className="flex flex-row items-center justify-center w-full pt-4 gap-x-8">
          <Button onPress={onOpen}>Add a new Asset</Button>
          <Button
            onClick={() => {
              navigate("/marketplace");
            }}
          >
            Go to Marketplace
          </Button>
        </div>
        <div className="divider"></div>

        {appState.userProfile.assets.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center w-full my-16 gap-y-4">
              <p className="">You do not own any assets</p>
            </div>
          </>
        ) : (
          <div className="flex flex-row flex-wrap my-8 gap-x-4">
            {appState.userProfile.assets.map((asset, index) => {
              return (
                // asset card
                <div className="w-fit" key={index}>
                  <Card isFooterBlurred radius="lg" className="border-none">
                    <img
                      alt="Woman listing to music"
                      className="object-cover shadow-lg w-80 h-80"
                      height={400}
                      // src={randomImage()}
                      src={randomImages[asset.id]}
                      width={400}
                    />
                    <CardFooter className="flex flex-col justify-start items-start before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-lg font-bold text-white">
                        {asset.name}
                      </p>
                      {/* location */}
                      {/* <div className="flex flex-row items-center justify-start gap-x-2">
                        <img src={location} alt="" className="w-4 h-4" />
                        <p className="text-sm text-white/60">Location</p>
                      </div> */}
                      <div className="py-0 my-0 divider after:bg-white before:bg-white"></div>
                      <div className="flex flex-row items-end py-2 gap-x-4">
                        <p className="text-xl font-bold leading-none text-white">
                          {ccValues[asset.id]} Carbon Credits
                        </p>
                        <p className="text-sm text-white/60"> / per year</p>
                      </div>
                      <div className="flex flex-row items-center justify-center w-full py-2 gap-x-4">
                        <Button
                          className="text-white text-tiny bg-white/20"
                          variant="flat"
                          color="default"
                          radius="lg"
                          size="sm"
                          onPress={() => {
                            setStatModal(true);
                            setSelectedAsset(asset);
                          }}
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
                            setPriceTID(asset.tokenUID);
                            setPriceModal(true);
                          }}
                        >
                          Sell
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageAssets;
