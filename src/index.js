import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor, store } from './store'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { ChainIDS } from './store/actions/common-functions';
const supportedChainIds = Object.values(ChainIDS);





/**
 * Include the connectors you want to support
 * injected - MetaMask
 * magic - Magic Link
 * walletconnect - Wallet Connect
 * walletlink - Coinbase Wallet
 */
const connectors = {
  injected: {},
  magic: {
    apiKey: "pk_...", // Your magic api key
    chainId: 1, // The chain ID you want to allow on magic
  },
  walletconnect: {},
  walletlink: {
    appName: "thirdweb - demo",
    url: "https://thirdweb.com",
    darkMode: false,
  },
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <App />
      </ThirdwebWeb3Provider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
