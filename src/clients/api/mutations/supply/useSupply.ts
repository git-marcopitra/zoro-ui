import { MutationObserverOptions, useMutation } from "@tanstack/react-query";
import supply, {
  SupplyInput,
  SupplyOutput,
} from "clients/api/mutations/supply";
import queryClient from "clients/api/queryClient";
import FunctionKey from "constants/functionKey";
import { useSigner } from "hooks/useSigner";
import { VToken } from "types";
import { useAccount } from "wagmi";

type Options = MutationObserverOptions<
  SupplyOutput,
  Error,
  Omit<SupplyInput, "vToken" | "signer">
>;

const useSupply = ({ vToken }: { vToken: VToken }, options?: Options) => {
  const { address: accountAddress } = useAccount();
  const signer = useSigner();

  return useMutation({
    ...options,
    mutationFn: (params) =>
      supply({
        vToken,
        signer,
        ...params,
      }),
    mutationKey: [FunctionKey.SUPPLY],
    onSuccess: (...onSuccessParams) => {
      queryClient.invalidateQueries({
        queryKey: [FunctionKey.GET_V_TOKEN_BALANCES_ALL],
      });
      queryClient.invalidateQueries({
        queryKey: [
          FunctionKey.GET_V_TOKEN_BALANCE,
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

export default useSupply;
