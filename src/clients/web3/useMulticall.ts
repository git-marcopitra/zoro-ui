import { Multicall } from "ethereum-multicall";
import { useProvider } from "hooks/useProvider";
import { useMemo } from "react";
import { getContractAddress } from "utilities";

const useMulticall = () => {
  const provider = useProvider();
  const MULTICALL_ADDRESS = getContractAddress("multicall");
  
  return useMemo(
    () =>
      new Multicall({
        multicallCustomContractAddress: MULTICALL_ADDRESS,
        ethersProvider: provider,
        tryAggregate: true,
      }),
    [provider]
  );
};

export default useMulticall;
