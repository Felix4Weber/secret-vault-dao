import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import daoVaultLogo from "@/assets/dao-vault-logo.png";

export const Header = () => {

  return (
    <header className="relative border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={daoVaultLogo} 
                alt="DAO Vault" 
                className="w-12 h-12 animate-vault-glow"
              />
              <div className="absolute inset-0 bg-vault-glow/20 rounded-full blur-md animate-encryption-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-vault-glow to-secondary bg-clip-text text-transparent">
                Confidential DAO Treasury
              </h1>
              <p className="text-sm text-muted-foreground">
                Encrypted · Secure · Decentralized
              </p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>
      </div>
      
      {/* Security Scan Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-encryption-glow to-transparent">
        <div className="h-full w-20 bg-gradient-to-r from-transparent via-primary to-transparent animate-secure-scan"></div>
      </div>
    </header>
  );
};