import { JsonRpcSigner } from "@ethersproject/providers";
import { providers } from "ethers";
import { useProvider } from "hooks/useProvider";
import { Config, useAccount, useConnectorClient } from "wagmi";

let signer: JsonRpcSigner;

export const useSigner = () => {
  const provider = useProvider();
  const { address } = useAccount();

  if (!provider || !address) return;

  const signer = provider.getSigner(address);

  return signer;
};
