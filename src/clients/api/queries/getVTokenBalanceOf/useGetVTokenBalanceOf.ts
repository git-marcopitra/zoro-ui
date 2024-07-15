import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import getVTokenBalanceOf, {
  GetVTokenBalanceOfInput,
  GetVTokenBalanceOfOutput,
} from "clients/api/queries/getVTokenBalanceOf";
import { useVTokenContract } from "clients/contracts/hooks";
import FunctionKey from "constants/functionKey";
import { VToken } from "types";

interface TrimmedParams
  extends Omit<GetVTokenBalanceOfInput, "vTokenContract"> {
  vToken: VToken;
}

type Options = QueryObserverOptions<
  GetVTokenBalanceOfOutput,
  Error,
  GetVTokenBalanceOfOutput,
  GetVTokenBalanceOfOutput,
  [
    FunctionKey.GET_V_TOKEN_BALANCE,
    { accountAddress: string; vTokenAddress: string }
  ]
>;

const useGetVTokenBalanceOf = (
  { accountAddress, vToken }: TrimmedParams,
  options?: Options
) => {
  const vTokenContract = useVTokenContract(vToken);

  return useQuery({
    queryKey: [
      FunctionKey.GET_V_TOKEN_BALANCE,
      { accountAddress, vTokenAddress: vToken.address },
    ],
    queryFn: () => getVTokenBalanceOf({ vTokenContract, accountAddress }),
    ...options,
  });
};

export default useGetVTokenBalanceOf;
