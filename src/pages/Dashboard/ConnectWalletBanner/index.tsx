/** @jsxImportSource @emotion/react */
import { useStyles } from "./styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useTranslation } from "translation";
import { useAccount } from "wagmi";

export const ConnectWalletBanner: React.FC = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const account = useAccount();

  if (account.address) return null;

  return (
    <Paper css={styles.container} className="connect-wallet-card-wrap">
      <div css={styles.content}>
        <Typography variant="h1" css={styles.title}>
          {t("dashboard.connectWalletBanner.title")}
        </Typography>

        <Typography css={styles.description}>
          {t("dashboard.connectWalletBanner.description")}
        </Typography>

        <ConnectButton />
      </div>
    </Paper>
  );
};

export default ConnectWalletBanner;
