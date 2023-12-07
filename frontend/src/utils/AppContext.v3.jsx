import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { connect, disconnect } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";
import {
  Provider,
  Account,
  Contract,
  json,
  stark,
  uint256,
  shortString,
  RpcProvider,
  constants,
  CallData,
} from "starknet";
import { Buffer } from "buffer";

import Loading from "../components/loader/Loading";
import Navbar from "../components/Navbar";
import contractABI from "../smart-contract/abi.json";

import testSierra from "../smart-contract/compiledVersions/sierra.json";
import testCasm from "../smart-contract/compiledVersions/casm1.json";
import { Button } from "@nextui-org/react";

const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    loggedIn: false,
    address: null,
    provider: null,
    connection: null,
    userProfile: null,
  });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const contractAddress =
    "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf";

  const connectWallet = async () => {
    const connection = await connect();

    if (connection && connection.isConnected) {
      setAppState((prevState) => {
        return {
          ...prevState,
          loggedIn: true,
          address: connection.account,
          provider: connection.provider,
          connection,
        };
      });
      getUserAccount(connection.account.address);
    }

    console.log("connection", connection);
  };

  const disconnectWallet = async () => {
    await disconnect();

    setAppState((prevState) => {
      return {
        ...prevState,
        loggedIn: false,
        address: null,
        provider: null,
        connection: null,
      };
    });
  };

  const getUserAccount = async (walletAddress) => {
    try {
      const response = await axios.get(`${backendURL}/user/${walletAddress}`);
      console.log("response", response.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          userProfile: response.data,
        };
      });
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const setupContract = async () => {
    const provider = new RpcProvider({
      sequencer: { baseUrl: constants.NetworkName.SN_GOERLI },
    });

    const privateKey0 =
      "0x043e67146cc12d56b39c0c2171916dfc574686f90af0c48d6d08fa49b53a0087";
    const account0Address =
      "0x016E1D78395cF8192049dB760b682Eb50252f31F3eF981E153c2C6681F963025";
    const account0 = new Account(provider, account0Address, privateKey0);

    const compiledTestSierra = json.parse(
      fs.readFileSync("./compiledContracts/test.sierra").toString("ascii")
    );
    const compiledTestCasm = json.parse(
      fs.readFileSync("./compiledContracts/test.casm").toString("ascii")
    );
    const deployResponse = await account0.declareAndDeploy({
      contract: compiledTestSierra,
      casm: compiledTestCasm,
    });

    const myTestContract = new Contract(
      contractABI,
      deployResponse.deploy.contract_address,
      provider
    );
    console.log(
      "Test Contract Class Hash =",
      deployResponse.declare.class_hash
    );
    console.log("✅ Test Contract connected at =", myTestContract.address);
  };

  const declareContract = async () => {
    console.log(">> declareContract started");
    const provider = new RpcProvider({
      sequencer: { baseUrl: constants.NetworkName.SN_GOERLI },
    });

    console.log(">> provider setup");

    const privateKey0 =
      "0x01d7684e243ce05f523a8b0613cc493aaf8a7ef8ffc67af354fec022bd4b024d";
    const account0Address =
      "0x054b95de598a483d41687c7051faa77f4e83886910ee5c5aebfee031e8bda1ae";

    const account0 = new Account(provider, account0Address, privateKey0, "1");
    // add ,"1" after privateKey0 if this account is not a Cairo 0 contract

    console.log(">> account0 setup");

    // Declare Test contract in devnet
    const compiledTestSierra = testSierra;

    console.log(">> compiledTestSierra setup");

    const compiledTestCasm = testCasm;

    console.log(">> compiledTestCasm setup");

    const declareResponse = await account0.declare({
      contract: compiledTestSierra,
      casm: compiledTestCasm,
    });

    console.log(
      "Test Contract declared with classHash =",
      declareResponse.class_hash
    );

    await provider.waitForTransaction(declareResponse.transaction_hash);
    console.log("✅ Test Completed.");
  };

  const deployContract = async () => {
    const provider = new RpcProvider({
      sequencer: { baseUrl: constants.NetworkName.SN_GOERLI },
    });

    console.log(">> provider setup");

    const privateKey0 =
      "0x01d7684e243ce05f523a8b0613cc493aaf8a7ef8ffc67af354fec022bd4b024d";
    const account0Address =
      "0x054b95de598a483d41687c7051faa77f4e83886910ee5c5aebfee031e8bda1ae";

    const account0 = new Account(provider, account0Address, privateKey0, "1");
    // add ,"1" after privateKey0 if this account is not a Cairo 0 contract

    console.log(">> account0 setup");

    const testClassHash =
      "0x0088a221acaef432edbb3f371addcd9e87eccd3f372597487784a1a8b663621b";

    console.log(">> testClassHash setup");

    const deployResponse = await account0.deployContract({
      classHash: testClassHash,
    });

    console.log(">> deployResponse setup");

    await provider.waitForTransaction(deployResponse.transaction_hash);

    console.log(">> waitForTransaction setup", deployResponse.transaction_hash);

    // read abi of Test contract
    const { abi: testAbi } = await provider.getClassByHash(testClassHash);
    if (testAbi === undefined) {
      throw new Error("no abi.");
    }

    console.log(">> testAbi setup");

    // Connect the new contract instance:
    const myTestContract = new Contract(
      testAbi,
      deployResponse.contract_address,
      provider
    );
    console.log("✅ Test Contract connected at =", myTestContract.address);
  };

  const interactWithContract = async () => {
    console.log(">> interactWithContract started");
    const provider = new RpcProvider({
      sequencer: { network: constants.NetworkName.SN_GOERLI },
    });
    // const provider = new RpcProvider({
    //   nodeUrl:
    //     "https://starknet-goerli.g.alchemy.com/v2/" +
    //     "xwv6dsEO1POIXFezwxRFli_20eHWbfRt",
    // });

    console.log(">> provider setup", provider);

    // const testAddress =
    //   // "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf";
    //   // "0x0657b8b892b4f149bfb5070d3831e02d82749c7c560060b880f2566f131b1cc0";
    //   "0x0191334a3fbba80951fe21b5d2830cd320902a2736c381a3141a82f0809293c0";

    const testAddress =
      // "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf";
      // "0x0657b8b892b4f149bfb5070d3831e02d82749c7c560060b880f2566f131b1cc0";
      "0x033f75015f314d547d7317f3fb774dbf3d10940a4985a3d1f8db5a917ada2875";

    // read abi of Test contract
    const testAbi = await provider.getClassAt(testAddress);
    console.log(">> testAbi ", testAbi);

    const myTestContract = new Contract(testAbi.abi, testAddress, provider);
    // const myTestContract = new Contract(contractABI, testAddress, provider);

    console.log(">> myTestContract clear", myTestContract);

    // Interaction with the contract with call
    const bal1 = await myTestContract.balance_of(
      "0x0655e860dc619389cfcefce82745d611c5270625f5c77f0915e0a26b15d75463"
    );
    console.log("Initial balance =", bal1.toString()); // .res because the return value is called 'res' in the Cairo 0 contract.
    // With Cairo 1 contract, the result value is in bal1, as bigint.
  };

  const writeToContract = async () => {
    console.log(">> interactWithContract started");
    const provider = new RpcProvider({
      nodeUrl:
        "https://starknet-goerli.g.alchemy.com/v2/" +
        "xwv6dsEO1POIXFezwxRFli_20eHWbfRt",
    });
    // const provider = new RpcProvider({
    //   sequencer: { network: constants.NetworkName.SN_GOERLI },
    // });

    console.log(">> provider setup", provider);

    const privateKey0 =
      "0x01d7684e243ce05f523a8b0613cc493aaf8a7ef8ffc67af354fec022bd4b024d";
    const account0Address =
      "0x054b95de598a483d41687c7051faa77f4e83886910ee5c5aebfee031e8bda1ae";

    const account0 = new Account(provider, account0Address, privateKey0, "1");
    // add ,"1" after privateKey0 if this account is not a Cairo 0 contract

    console.log(">> account0 setup", account0);

    const testAddress =
      // "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf";
      // "0x0657b8b892b4f149bfb5070d3831e02d82749c7c560060b880f2566f131b1cc0";
      // "0x0191334a3fbba80951fe21b5d2830cd320902a2736c381a3141a82f0809293c0";
      "0x033f75015f314d547d7317f3fb774dbf3d10940a4985a3d1f8db5a917ada2875";

    // read abi of Test contract
    const testAbi = await provider.getClassAt(testAddress);
    console.log(">> testAbi ", testAbi);

    const myTestContract = new Contract(testAbi.abi, testAddress, account0);
    // const myTestContract = new Contract(contractABI, testAddress, provider);

    const newContract = new Contract(
      testAbi.abi,
      testAddress,
      appState.address
    );

    console.log(">> myTestContract clear", newContract);

    const response = await newContract.mint(
      "0x0655e860dc619389cfcefce82745d611c5270625f5c77f0915e0a26b15d75463",
      2
    );

    console.log(">> response", response);

    // console.log(">> myTestContract clear", myTestContract);

    // Connect account with the contract
    // myTestContract.connect(account0);

    // console.log(">> myTestContract connect", myTestContract);

    // const myCall = myTestContract.populate("increase_balance", [10, 30]);
    // const myCall = myTestContract.populate("mint", [
    //   "0x0655e860dc619389cfcefce82745d611c5270625f5c77f0915e0a26b15d75463",
    //   "0x1",
    // ]);

    // console.log(">> myCall populated", myCall);

    // const contractCallData = [
    //   "0x0655e860dc619389cfcefce82745d611c5270625f5c77f0915e0a26b15d75463",
    //   1,
    // ];

    // const res = await myTestContract.mint(myCall.calldata);
    // const res = await myTestContract.mint(
    //   "0x0655e860dc619389cfcefce82745d611c5270625f5c77f0915e0a26b15d75463",
    //   1
    // );
    // const res = await myTestContract.invoke("mint", contractCallData, {
    //   parseRequest: true,
    // });

    // console.log(">> res(1) ", res);

    // try {
    //   const multiCall = await account0.execute({
    //     contractAddress: testAddress,
    //     entrypoint: "mint",
    //     // approve 1 wei for bridge
    //     calldata: CallData.compile({
    //       to: "0x0655e860dc619389cfcefce82745d611c5270625f5c77f0915e0a26b15d75463",
    //       token_id: 1,
    //     }),
    //   });

    //   console.log(">> multiCall ", multiCall);

    //   // await provider.waitForTransaction(res.transaction_hash);
    //   await provider.waitForTransaction(multiCall.transaction_hash);

    //   console.log(">> waitForTransaction setup", multiCall.transaction_hash);

    //   // console.log(">> res(2) ", res);
    // } catch (error) {
    //   console.log(">> error ", error);
    // }
  };

  const insSNK = async () => {
    // console.log(">> insSNK started", snk);
  };

  const test = async (str) => {
    console.log("0x" + Buffer.from(str).toString("hex"));
  };

  useEffect(() => {
    // connectWallet();
    // interactWithContract();
    // declareContract();
    // deployContract();
    // writeToContract();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        loadingText,
        setLoadingText,
        appState,
        setAppState,
        connectWallet,
        disconnectWallet,
      }}
    >
      <Toaster />
      {loading === true ? (
        <Loading />
      ) : (
        <div className="">
          <Navbar />
          <Button onPress={writeToContract}>Write Contract</Button>
          <Button onPress={interactWithContract}>getBalance() Contract</Button>
          <Button onPress={insSNK}>SNK Check</Button>
          <Button onPress={() => test("hello")}>Test</Button>
          {children}

          {/* <Footer /> */}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
