// const requireAuth = require("./Middleware/requireAuth");
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { Server } = require('socket.io');
const bp = require('body-parser')
// const dns = require('dns');
dotenv.config();
require("./db/connection");
const app = express();
const http = require('http').createServer(app);

const { XummSdk } = require('xumm-sdk');
const { getBalanceSocket, BatchMintingStart } = require("./controller/xumm");
const Sdk = new XummSdk(process.env.Xumm_API_Key, process.env.Xumm_API_SECRET_KEY);



const io = new Server(http, {
  cors: {
    origin: '*',
  },
});


app.use(cors('*'));

app.use("/uploads", express.static('uploads'));

app.use(express.json());

app.use(bp.json())

app.use(bp.urlencoded({
  extended: true
}));


io.on('connection', function (socket) {
  //Whenever someone disconnects this piece of code executed
  socket.on(`xumm`, async (data) => {
    try {
      const request = {
        "txjson": {
          "TransactionType": "SignIn",
        }
      }
      const appInfo = await Sdk.ping()
      const subscription = await Sdk.payload.createAndSubscribe(request, event => {
        // it is used to hold the node untill the request get signed
        if (Object.keys(event.data).indexOf('signed') > -1) {
          return event.data;
          // socket.volatile.emit('error', event.data);
          // return;
        }
      })

      const qrCode = subscription.created;
      const qrData = await qrCode.refs.qr_png;
      socket.volatile.emit('xummwallet', qrData);

      const resolveData = await subscription.resolved;

      if (resolveData.signed === false) {
        socket.volatile.emit('error', error);
      } else {

        const result = await Sdk.payload.get(resolveData.payload_uuidv4);

        const walletAddress = result.response.account

        const userToken = result.application.issued_user_token

        socket.volatile.emit('xummwalletSignIn', { userToken: userToken, walletAddress: walletAddress });

      }

    } catch (error) {
      socket.volatile.emit('error', error);
    }
  });

  socket.on('xumm-wallet', getBalanceSocket)
  socket.on('batch-minting', BatchMintingStart)
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

});

app.use(require("./route/signup.js"));


app.get("/", (req, res) => {
  res.send({ msg: "Server is running fine" });
  // console.log("app is working")

});


http.listen(process.env.PORT, () => {
  console.log("App is running on ", process.env.HOST_URL);
});

// process.on('uncaughtException', function (rest) {
//   console.log('restChange', rest);
// })