import { MutationObserverOptions, useMutation } from "@tanstack/react-query";
import { BorrowInput, BorrowOutput, borrow, queryClient } from "clients/api";
import { useVTokenContract } from "clients/contracts/hooks";
import FunctionKey from "constants/functionKey";
import { VToken } from "types";

type Options = MutationObserverOptions<
  BorrowOutput,
  Error,
  Omit<BorrowInput, "vTokenContract">
>;

const useBorrow = ({ vToken }: { vToken: VToken }, options?: Options) => {
  const vTokenContract = useVTokenContract(vToken);

  return useMutation({
    mutationKey: [FunctionKey.BORROW],
    mutationFn: (params) =>
      borrow({
        vTokenContract,
        ...params,
      }),

    ...options,
    onSuccess: async (...onSuccessParams) => {
      const accountAddress = await vTokenContract.signer.getAddress();

      queryClient.invalidateQueries({
        queryKey: [FunctionKey.GET_V_TOKEN_BALANCES_ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_BALANCE_OF,
          {
            accountAddress,
            vTokenAddress: vToken.address,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [FunctionKey.GET_MAIN_MARKETS],
      });
      queryClient.invalidateQueries({
        queryKey: [FunctionKey.GET_ISOLATED_POOLS],
      });

      if (options?.onSuccess) {
        options.onSuccess(...onSuccessParams);
      }
    },
  });
};

export default useBorrow;
