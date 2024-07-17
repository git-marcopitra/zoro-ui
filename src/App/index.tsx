import Switch from "./Switch";
import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "assets/styles/App.scss";
import { Layout } from "components";
import { SuccessfulTransactionModalProvider } from "context/SuccessfulTransactionModalContext";
import React from "react";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider } from "theme/MuiThemeProvider";
import { arbitrum, base, mainnet, polygon, sepolia } from "viem/chains";
import { zkSync, zkSyncSepoliaTestnet } from "viem/zksync";
import { WagmiProvider } from "wagmi";

const config = getDefaultConfig({
  appName: "Zoro Defi",
  projectId: "Zoro",
  chains: [
    zkSync,
    zkSyncSepoliaTestnet,
    mainnet,
    arbitrum,
    polygon,
    sepolia,
    base,
  ],
  ssr: true,
});

const query = new QueryClient();

const App = () => (
  // <GeolocationProvider>
  <WagmiProvider config={config}>
    <QueryClientProvider client={query}>
      <RainbowKitProvider>
        <MuiThemeProvider>
          <SuccessfulTransactionModalProvider>
            <HashRouter>
              <ToastContainer />
              <Layout>
                <Switch />
              </Layout>
            </HashRouter>
          </SuccessfulTransactionModalProvider>
        </MuiThemeProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  // </GeolocationProvider>
);

export default App;
