import { MutationObserverOptions, useMutation } from "@tanstack/react-query";
import { RepayInput, RepayOutput, queryClient, repay } from "clients/api";
import FunctionKey from "constants/functionKey";
import { useSigner } from "hooks/useSigner";
import { VToken } from "types";

type Options = MutationObserverOptions<
  RepayOutput,
  Error,
  Omit<RepayInput, "signer" | "vToken">
>;

const useRepay = ({ vToken }: { vToken: VToken }, options?: Options) => {
  const signer = useSigner();

  return useMutation({
    ...options,
    mutationFn: (params) =>
      repay({
        signer,
        vToken,
        ...params,
      }),
    mutationKey: [FunctionKey.REPAY],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FunctionKey.GET_MAIN_MARKETS],
      }),
        queryClient.invalidateQueries({
          queryKey: [FunctionKey.GET_V_TOKEN_BALANCES_ALL],
        }),
        queryClient.invalidateQueries({
          queryKey: [FunctionKey.GET_ISOLATED_POOLS],
        });
    },
  });
};

export default useRepay;
