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

function PriceModal({ isOpen, onOpenChange, setPriceModal, tokenUID }) {
  const { appState, listForSale } = useAppContext();
  const [price, setPrice] = useState(null);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 mt-4">
              <p className="font-bold text-">
                Selling Price&nbsp;
                <span className="text-black/50">(in ETH)</span>
              </p>

              <div className="my-0 divider"></div>
            </ModalHeader>
            <ModalBody>
              <Input
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setPriceModal(false);
                  setPrice(null);
                }}
              >
                Close
              </Button>
              <Button
                color=""
                className="text-white bg-blue-500"
                variant="light"
                onPress={async () => {
                  toast.loading("Listing for sale...");
                  const response = await listForSale(price, tokenUID);
                  toast.dismiss();
                  if (response === true) {
                    setPriceModal(false);
                    toast.success("Successfully listed for sale!");
                  } else {
                    toast.error("Error listing for sale");
                  }
                }}
              >
                List on Marketplace
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default PriceModal;
