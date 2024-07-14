import { Web3Provider } from "@ethersproject/providers";
import { providers } from "ethers";
import { Config, useAccount, useConnectorClient } from "wagmi";

let cachedProvider: Web3Provider;

export const useProvider = () => {
  const { chain, chainId } = useAccount();
  const { data } = useConnectorClient<Config>({ chainId });

  const transport = data?.transport;

  if (!chain || !chainId || !transport) return;

  if (!cachedProvider) {
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };

    cachedProvider = new providers.Web3Provider(transport, network);
  }

  return cachedProvider;
};
