import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import getAllowance, {
  GetAllowanceInput,
  GetAllowanceOutput,
} from "clients/api/queries/getAllowance";
import { useTokenContract } from "clients/contracts/hooks";
import FunctionKey from "constants/functionKey";
import { Token } from "types";

export type UseGetAllowanceQueryKey = [
  FunctionKey.GET_TOKEN_ALLOWANCE,
  {
    tokenAddress: string;
    spenderAddress: string;
    accountAddress: string;
    isValidAllowance?: boolean;
  }
];

type Options = QueryObserverOptions<
  GetAllowanceOutput,
  Error,
  GetAllowanceOutput,
  GetAllowanceOutput,
  UseGetAllowanceQueryKey
>;

const useGetAllowance = (
  {
    token,
    spenderAddress,
    accountAddress,
    isValidAllowance,
  }: Omit<GetAllowanceInput, "tokenContract"> & { token: Token },
  options?: Options
) => {
  const tokenContract = useTokenContract(token);

  return useQuery({
    queryKey: [
      FunctionKey.GET_TOKEN_ALLOWANCE,
      {
        tokenAddress: token.address,
        spenderAddress,
        accountAddress,
        isValidAllowance,
      },
    ],
    queryFn: () =>
      getAllowance({
        tokenContract,
        spenderAddress,
        accountAddress,
      }),
    ...options,
  });
};

export default useGetAllowance;
