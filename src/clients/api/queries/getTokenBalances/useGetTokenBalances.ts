import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import {
  GetTokenBalancesInput,
  GetTokenBalancesOutput,
  getTokenBalances,
} from "clients/api";
import { useMulticall } from "clients/web3";
import FunctionKey from "constants/functionKey";
import { useProvider } from "hooks/useProvider";

export type Options = QueryObserverOptions<
  GetTokenBalancesOutput,
  Error,
  GetTokenBalancesOutput,
  GetTokenBalancesOutput
>;

const useGetTokenBalances = (
  {
    accountAddress,
    tokens,
  }: Omit<GetTokenBalancesInput, "multicall" | "provider">,
  options?: Options
) => {
  const multicall = useMulticall();
  const provider = useProvider();

  // Sort addresses alphabetically to prevent unnecessary re-renders
  const sortedTokenAddresses = [...tokens].map((token) => token.address).sort();

  const result = useQuery({
    queryKey: [
      FunctionKey.GET_TOKEN_BALANCES,
      {
        accountAddress,
      },
      ...sortedTokenAddresses,
    ],
    queryFn: () =>
      getTokenBalances({ multicall, accountAddress, tokens, provider }),
    ...options,
  });
  return result;
};

export default useGetTokenBalances;
