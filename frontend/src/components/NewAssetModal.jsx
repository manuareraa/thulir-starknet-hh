import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useAppContext } from "../utils/AppContext";

import done from "../assets/svg/done.svg";
import toast from "react-hot-toast";

function NewAssetModal({ isOpen, onOpenChange }) {
  const { mint, appState } = useAppContext();
  const [assetId, setAssetId] = useState("");
  const [minted, setMinted] = useState(false);
  const [assetName, setAssetName] = useState("");

  const localMint = async () => {
    console.log("local minting", assetName, assetId, appState);
    toast.loading("Minting Asset...");
    const response = await mint(assetName, assetId);
    if (response === false) {
      toast.dismiss();
      toast.error("Minting Failed. Please try again.");
    } else {
      toast.dismiss();
      toast.success("Minting Successful !!");
      setMinted(true);
    }
  };

  useEffect(() => {
    // generate a random asset id
    const id = Math.random().toString(36).substring(2, 15);
    setAssetId(id);
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className="text-2xl font-bold">Add a New Asset</p>

              <div className="my-0 divider"></div>
            </ModalHeader>
            <ModalBody>
              {minted === false ? (
                <div className="flex flex-col w-full gap-y-2">
                  <div className="w-80">
                    <Input
                      type="text"
                      label="Asset Name"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                    />
                    <p className="mt-1 text-sm text-black/60">
                      Asset ID:
                      <span className=""> {assetId}</span>
                    </p>
                  </div>

                  {/* documents container */}
                  <div className="flex flex-col my-4 gap-y-2">
                    <div className="my-2">
                      <p className="text-xl font-bold">
                        Upload Digital Ownership of your Asset
                      </p>
                    </div>
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                    />
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                    />
                    <input
                      type="file"
                      className="w-full max-w-xs file-input file-input-bordered"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full gap-y-4">
                  <img src={done} alt="" className="w-40 h-40" />
                  <p>Mint Successful !!</p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {minted === false ? (
                <Button color="primary" onPress={() => localMint()}>
                  Mint and Deploy Asset
                </Button>
              ) : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NewAssetModal;
