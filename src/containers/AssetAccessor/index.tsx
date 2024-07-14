/** @jsxImportSource @emotion/react */
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DisabledActionNotice from "./DisabledActionNotice";
import { useGetPool } from "clients/api";
import useAssetInfo from "hooks/useAssetInfo";
import React from "react";
import { Asset, Pool, TokenAction, VToken } from "types";
import { areTokensEqual, isTokenActionEnabled } from "utilities";
import { useAccount } from "wagmi";

export interface AssetAccessorProps {
  vToken: VToken;
  poolComptrollerAddress: string;
  connectWalletMessage: string;
  approveTokenMessage: string;
  action: TokenAction;
  children: (props: { asset: Asset; pool: Pool }) => React.ReactNode;
  setIsValidAllowance?: () => void;
  isValidAllowance?: boolean;
}

const AssetAccessor: React.FC<AssetAccessorProps> = ({
  vToken,
  poolComptrollerAddress,
  children,
  connectWalletMessage,
  approveTokenMessage,
  action,
  setIsValidAllowance,
  isValidAllowance,
}) => {
  const { address: accountAddress } = useAccount();

  const { data: getPoolData } = useGetPool({
    poolComptrollerAddress,
    accountAddress,
  });
  const pool = getPoolData?.pool;
  const asset = pool?.assets.find((item) =>
    areTokensEqual(item.vToken, vToken)
  );
  const type =
    action === "supply" || action === "repay"
      ? "supply"
      : "borrow";

  const assetInfo = useAssetInfo({ asset, type });

  //console.log("underlying vtoken", vToken);
  if (
    !isTokenActionEnabled({
      token: vToken.underlyingToken,
      action,
    })
  ) {
    return (
      <DisabledActionNotice token={vToken.underlyingToken} action={action} />
    );
  }

  return (
    <ConnectButton />
  );
};

export default AssetAccessor;