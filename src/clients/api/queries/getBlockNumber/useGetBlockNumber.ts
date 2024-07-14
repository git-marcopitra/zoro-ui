import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { getBlockNumber } from "clients/api/";
import FunctionKey from "constants/functionKey";
import { BLOCK_TIME_MS } from "constants/zk";
import { useProvider } from "hooks/useProvider";

interface GetBlockNumberOutput {
  blockNumber: number;
}

type Options = QueryObserverOptions<
  GetBlockNumberOutput,
  Error,
  GetBlockNumberOutput,
  GetBlockNumberOutput
>;

const useGetBlockNumber = (options?: Options) => {
  const provider = useProvider();

  return useQuery({
    queryKey: [FunctionKey.GET_BLOCK_NUMBER],
    queryFn: () => getBlockNumber({ provider }),
    refetchInterval: BLOCK_TIME_MS,
    ...options,
  });
};

export default useGetBlockNumber;
