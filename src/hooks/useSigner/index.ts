import { JsonRpcSigner } from "@ethersproject/providers";
import { providers } from "ethers";
import { useProvider } from "hooks/useProvider";
import { Config, useAccount, useConnectorClient } from "wagmi";


export const useSigner = () => {
  const provider = useProvider();

  return provider.getSigner();
};
