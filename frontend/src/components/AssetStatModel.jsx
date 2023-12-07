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

function AssetStatModel({ isOpen, onOpenChange, setStatModal, selectedAsset }) {
  const [stats, setStats] = useState({
    treeCount: 0,
    co2Concentration: 0,
    treeHeight: 0,
    avgSoilMoisture: 0,
    avgSoilTemperature: 0,
    soilPh: 0,
    co2Conc: 0,
    ambientTemperature: 0,
    humidity: 0,
    waterUsage: 0,
    waterQuality: "",
    ndvi: 0,
    co2Sequestrated: 0,
  });

  useEffect(() => {
    console.log("selected asset", selectedAsset);
  }, [selectedAsset]);

  useEffect(() => {
    // Function to generate random stats
    function generateRandomStats() {
      const treeCount = Math.floor(Math.random() * 20000) + 500;
      const co2Concentration = (Math.random() * 200 + 400).toFixed(3);
      const treeHeight = (Math.random() * 15 + 5).toFixed(1);
      const avgSoilMoisture = (Math.random() * 60 + 20).toFixed(1);
      const avgSoilTemperature = (Math.random() * 10 + 10).toFixed(1);
      const soilPh = (Math.random() * 3 + 4).toFixed(1);
      const co2Conc = (Math.random() * 200 + 400).toFixed(0);
      const ambientTemperature = (Math.random() * 15 + 15).toFixed(1);
      const humidity = (Math.random() * 40 + 30).toFixed(1);
      const waterUsage = (Math.random() * 15 + 10).toFixed(1);
      const waterQuality = String.fromCharCode(
        65 + Math.floor(Math.random() * 5)
      );
      const ndvi = (Math.random() * 0.3 + 0.3).toFixed(2);
      const co2Sequestrated = (Math.random() * 800 + 200).toFixed(0);

      return {
        treeCount,
        co2Concentration,
        treeHeight,
        avgSoilMoisture,
        avgSoilTemperature,
        soilPh,
        co2Conc,
        ambientTemperature,
        humidity,
        waterUsage,
        waterQuality,
        ndvi,
        co2Sequestrated,
      };
    }

    // Update the state with random stats
    const randomStats = generateRandomStats();
    setStats(randomStats);

    console.log("random stats", randomStats);
  }, [selectedAsset]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-8">
              <p className="text-4xl font-bold">
                {selectedAsset ? selectedAsset.name : "Asset Name"}
              </p>

              <div className="my-0 divider"></div>
            </ModalHeader>
            <ModalBody>
              {/* stats container */}
              <div className="grid grid-cols-3 gap-y-2 gap-x-4">
                {/* <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Asset ID</div>
                    <div className="stat-value">{selectedAsset.tokenUID}</div>
                  </div>
                </div> */}

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Tree Count (approx.)</div>
                    <div className="stat-value">{stats.treeCount}</div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">CO2 Concentration</div>
                    <div className="stat-value">
                      {stats.co2Concentration}
                      PPM
                    </div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Tree Height</div>
                    <div className="stat-value">{stats.treeHeight}m</div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Avg. Soil Moisture</div>
                    <div className="stat-value">{stats.avgSoilMoisture}%</div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Avg. Soil Temperature</div>
                    <div className="stat-value">
                      {stats.avgSoilTemperature}
                      °C
                    </div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Soil pH</div>
                    <div className="stat-value">{stats.soilPh}</div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">CO2 Conc.</div>
                    <div className="stat-value">
                      {stats.co2Conc}
                      ppm
                    </div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Ambient Temperature</div>
                    <div className="stat-value">
                      {stats.ambientTemperature}
                      °C
                    </div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Humidity</div>
                    <div className="stat-value">{stats.humidity}%</div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">Water Usage (last 7 days)</div>
                    <div className="stat-value">
                      {stats.waterUsage}
                      L/m²
                    </div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">
                      Water Quality (scale A to E)
                    </div>
                    <div className="stat-value">{stats.waterQuality}</div>
                  </div>
                </div>

                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">NDVI</div>
                    <div className="stat-value">{stats.ndvi}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center my-8">
                <div className="shadow stats">
                  <div className="stat">
                    <div className="stat-title">CO2 Sequestrated / year</div>
                    <div className="text-5xl text-green-500 stat-value">
                      {stats.co2Sequestrated}&nbsp;T
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  setStatModal(false);
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AssetStatModel;
