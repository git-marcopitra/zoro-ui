/** @jsxImportSource @emotion/react */
import { SecondaryButton } from "../Button";
import { NoticeInfo } from "../Notice";
import { useStyles } from "./styles";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useTranslation } from "translation";

export interface PromptProps {
  message: string;
  className?: string;
  connected: boolean;
}

export const Prompt: React.FC<PromptProps> = ({
  message,
  className,
  children,
  connected,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  // Render prompt if user aren't connected with any wallet
  if (connected) {
    return <>{children}</>;
  }
  return (
    <div css={styles.container} className={className}>
      <NoticeInfo css={styles.notice} description={message} />

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <SecondaryButton
                      fullWidth
                      onClick={openConnectModal}
                      className="custom-btn-wrap"
                    >
                      {t("connectWallet.connectButton")}
                    </SecondaryButton>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
                    <SecondaryButton
                      fullWidth
                      onClick={openAccountModal}
                      className="custom-btn-wrap"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </SecondaryButton>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};
