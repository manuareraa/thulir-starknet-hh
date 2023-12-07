const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const fs = require("fs");

// Initialize express app
const app = express();

// Apply middleware
app.use(cors()); // Enables CORS
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// MongoDB connection
const MONGO_URI = process.env.MONGO_URL || "";

let db;
MongoClient.connect(MONGO_URI).then((client) => {
  db = client.db("thulir"); // Now db can be used to write direct MongoDB queries
  console.log("MongoDB connected successfully");
});

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend Application!");
});

// const response = await axios.get(`${backendURL}/user/${walletAddress}`);
app.get("/user/:walletAddress", async (req, res) => {
  console.log("GET /user/:walletAddress");
  try {
    const { walletAddress } = req.params;
    const user = await db.collection("users").findOne({ walletAddress });

    // if user not found then create a new user profile with the wallet address
    if (!user) {
      await db.collection("users").insertOne({
        walletAddress: walletAddress,
        carbonCredits: 0,
        greenCredits: 0,
        assets: [],
        investments: [],
        technologies: [],
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.get("/get-token-details", async (req, res) => {
  console.log("GET /get-token-details");
  try {
    const tokenDetails = await db.collection("token").findOne({
      token: "TLR",
    });
    res.status(200).json({ tokenData: tokenDetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// update currentSupply in token data
app.post("/update-token-supply", async (req, res) => {
  console.log("POST /update-token-supply");
  try {
    const { currentSupply } = req.body;
    await db
      .collection("token")
      .updateOne({ token: "TLR" }, { $set: { currentSupply } });
    res.status(200).json({ message: "Token supply updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// add a new document to "tokens" collection
app.post("/add-new-token", async (req, res) => {
  console.log("POST /add-token");
  try {
    const { name, id, address, tokenUID } = req.body;
    await db.collection("tokens").insertOne({
      tokenUID,
      name,
      id,
      address,
    });
    res.status(200).json({ message: "Token added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// get all tokens from "tokens" collection matchin the address
app.get("/get-tokens/:address", async (req, res) => {
  console.log("GET /get-tokens/:address");
  try {
    const { address } = req.params;
    console.log(address);
    // find all the tokens with matching address
    const tokens = await db
      .collection("tokens")
      .find({ address: address })
      .toArray();
    res.status(200).json({ tokens });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// endpoint that will receive a token UID and it will remove the document from the "tokens" collection and add it to the "forSale" collection
app.post("/put-on-sale", async (req, res) => {
  console.log("POST /sell-token");
  try {
    const { tokenUID, price, sellerAddress } = req.body;
    console.log(tokenUID, price, sellerAddress);
    // find the token with matching tokenUID
    const token = await db.collection("tokens").findOne({ tokenUID });
    // remove the token from "tokens" collection
    await db.collection("tokens").deleteOne({ tokenUID });
    // add the token to "forSale" collection
    await db.collection("forSale").insertOne({
      tokenUID,
      name: token.name,
      id: token.id,
      address: token.address,
      price,
      sellerAddress,
    });
    res.status(200).json({ message: "Token added to forSale successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// endpoint to get all tokens that are for sale
app.get("/get-tokens-for-sale", async (req, res) => {
  console.log("GET /get-tokens-for-sale");
  try {
    const tokens = await db.collection("forSale").find().toArray();
    res.status(200).json({ tokens });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Listen on a port
const PORT = process.env.PORT || 3070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
