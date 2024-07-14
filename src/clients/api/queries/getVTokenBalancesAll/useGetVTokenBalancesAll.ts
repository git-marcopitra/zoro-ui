import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import getVTokenBalancesAll, {
  GetVTokenBalancesAllInput,
  GetVTokenBalancesAllOutput,
} from "clients/api/queries/getVTokenBalancesAll";
import { useVenusLensContract } from "clients/contracts/hooks";
import { DEFAULT_REFETCH_INTERVAL_MS } from "constants/defaultRefetchInterval";
import FunctionKey from "constants/functionKey";

// 2nd way to interface with contract
//import { getTokenContract } from 'clients/contracts';

type Options = QueryObserverOptions<
  GetVTokenBalancesAllOutput,
  Error,
  GetVTokenBalancesAllOutput,
  GetVTokenBalancesAllOutput,
  [
    FunctionKey.GET_V_TOKEN_BALANCES_ALL,
    Omit<GetVTokenBalancesAllInput, "venusLensContract">
  ]
>;

const useGetVTokenBalancesAll = (
  {
    account,
    vTokenAddresses,
  }: Omit<GetVTokenBalancesAllInput, "venusLensContract">,
  options?: Options
) => {
  const venusLensContract = useVenusLensContract();
  const result = useQuery({
    queryKey: [
      FunctionKey.GET_V_TOKEN_BALANCES_ALL,
      { account, vTokenAddresses },
    ],
    queryFn: () =>
      getVTokenBalancesAll({ venusLensContract, account, vTokenAddresses }),
    refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
    ...options,
  });
  //const { provider } = useAuth();

  //const tokenContract = getTokenContract(TOKENS.usdc);

  //const resp = tokenContract.balanceOf(account)
  //console.log("USDC contract balance of account", resp);
  //const {data: balance_result} = useGetBalanceOf({
  //token: TOKENS.test,
  //accountAddress: account
  //})
  return result;
};

export default useGetVTokenBalancesAll;
