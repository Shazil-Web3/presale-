"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletConnect({ className = "", compact = false }) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className={className}
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
                  <button
                    onClick={openConnectModal}
                    className={`rounded-xl bg-acid-lime font-bold text-[#08080a] transition hover:opacity-90 active:scale-95 whitespace-nowrap ${
                      compact ? "p-2" : "px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm"
                    }`}
                  >
                    {compact ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                      </svg>
                    ) : (
                      "Connect Wallet"
                    )}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 border border-red-500/20 transition hover:bg-red-500/20"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] text-sm font-medium text-foreground transition hover:bg-white/[0.12] hover:border-white/20 ${
                      compact ? "h-10 w-10 justify-center" : "px-3 py-2"
                    }`}
                  >
                    {chain.hasIcon && (
                      <div className="h-5 w-5 overflow-hidden rounded-full">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    )}
                    {!compact && <span className="hidden sm:inline">{chain.name}</span>}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className={`group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] font-medium text-foreground transition-all active:scale-95 ${
                      compact ? "h-10 w-10 justify-center border-acid-lime/20 hover:border-red-500/40" : "px-3 py-2 text-sm"
                    }`}
                  >
                    {account.hasAvatar ? (
                      <div className="h-6 w-6 overflow-hidden rounded-full border border-white/10">
                        <img src={account.avatar} alt="avatar" className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="relative flex h-6 w-6 items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-acid-lime/70 group-hover:text-red-400 transition-colors"
                        >
                          <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                          <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                        </svg>
                        {/* Status Indicator Badge */}
                        <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#08080a] bg-acid-lime shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                      </div>
                    )}
                    {!compact && (
                      <span className="hidden xs:inline">
                        {account.displayName}
                      </span>
                    )}
                    
                    {/* Subtle "Connected" Glow for mobile */}
                    {compact && (
                      <div className="absolute inset-0 rounded-xl bg-acid-lime/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
