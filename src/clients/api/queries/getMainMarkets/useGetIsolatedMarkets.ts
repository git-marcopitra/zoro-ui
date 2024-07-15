import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import getMainMarkets, {
  GetMainMarketsOutput,
} from "clients/api/queries/getMainMarkets";
import {
  useComptrollerContract,
  useVenusLensContract,
} from "clients/contracts/hooks";
import { useMulticall } from "clients/web3";
import { DEFAULT_REFETCH_INTERVAL_MS } from "constants/defaultRefetchInterval";
import FunctionKey from "constants/functionKey";
import { getContractAddress } from "utilities";

type Options = QueryObserverOptions<
  GetMainMarketsOutput,
  Error,
  GetMainMarketsOutput,
  GetMainMarketsOutput
>;

const useGetIsolatedMarkets = (options?: Options) => {
  const venusLensContract = useVenusLensContract();
  const multicall = useMulticall();
  const comptrollerAddress = getContractAddress("degen:comptroller");
  const comptroller = useComptrollerContract(comptrollerAddress);

  const result = useQuery({
    queryKey: [FunctionKey.GET_ISOLATED_MARKETS],
    queryFn: () =>
      getMainMarkets({ multicall, venusLensContract, comptroller }),
    refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
    ...options,
  });

  return result;
};

export default useGetIsolatedMarkets;
