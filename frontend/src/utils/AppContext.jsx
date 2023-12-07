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
    currentSupply: 0,
  });
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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
      getTokenData();
      getAllTokens(connection.account.address);
      getAllTokensForSale();
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

  const getTokenData = async () => {
    try {
      const response = await axios.get(`${backendURL}/get-token-details`);
      console.log("response", response.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          currentSupply: response.data.tokenData.currentSupply,
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

  const mint = async (name, uid) => {
    console.log(">> interactWithContract started");
    try {
      // const provider = new RpcProvider({
      //   nodeUrl:
      //     "https://starknet-goerli.g.alchemy.com/v2/" +
      //     "xwv6dsEO1POIXFezwxRFli_20eHWbfRt",
      // });
      const provider = new RpcProvider({
        sequencer: { network: constants.NetworkName.SN_GOERLI },
      });
      const testAddress =
        "0x033f75015f314d547d7317f3fb774dbf3d10940a4985a3d1f8db5a917ada2875";
      const testAbi = await provider.getClassAt(testAddress);
      const newContract = new Contract(
        testAbi.abi,
        testAddress,
        appState.address
      );
      const response = await newContract.mint(
        appState.address.address,
        appState.currentSupply + 1
      );
      console.log(">> response 0", response);
      await provider.waitForTransaction(response.transaction_hash);
      await addNewToken(appState.currentSupply + 1, name, uid);
      await updateTokenSuply();
      await getAllTokens(appState.address.address);
      console.log(">> response", response);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const addNewToken = async (id, name, uid) => {
    console.log(">> interactWithContract started");
    try {
      const response = await axios.post(`${backendURL}/add-new-token`, {
        name: name,
        id: id,
        address: appState.address.address,
        tokenUID: uid,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateTokenSuply = async () => {
    console.log(">> interactWithContract started");
    try {
      const response = await axios.post(`${backendURL}/update-token-supply`, {
        currentSupply: appState.currentSupply + 1,
      });
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllTokens = async (address) => {
    console.log(">> interactWithContract started");
    try {
      const response = await axios.get(`${backendURL}/get-tokens/${address}`);
      console.log("all tokens response", response.data.tokens);
      setAppState((prevState) => {
        return {
          ...prevState,
          userProfile: {
            ...prevState.userProfile,
            assets: response.data.tokens,
          },
        };
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const listForSale = async (price, tokenUID) => {
    console.log(">> listForSale started");
    try {
      const response = await axios.post(`${backendURL}/put-on-sale`, {
        tokenUID: tokenUID,
        price: price,
        sellerAddress: appState.address.address,
      });
      console.log("response", response.data);
      getAllTokens(appState.address.address);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const getAllTokensForSale = async () => {
    console.log(">> getAllTokensForSale started");
    try {
      const response = await axios.get(`${backendURL}/get-tokens-for-sale`);
      console.log("all sale tokens", response.data);
      setAppState((prevState) => {
        return {
          ...prevState,
          saleAssets: response.data.tokens,
        };
      });
      return response.data.tokens;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    connectWallet();
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
        getUserAccount,
        getTokenData,
        mint,
        updateTokenSuply,
        listForSale,
        getAllTokensForSale,
      }}
    >
      <Toaster />
      {loading === true ? (
        <Loading />
      ) : (
        <div className="">
          <Navbar />
          {children}

          {/* <Footer /> */}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
