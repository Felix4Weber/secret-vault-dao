import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LockIcon, EyeIcon, EyeOffIcon, ShieldCheckIcon } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  title: string;
  balance: string;
  usdValue: string;
  isEncrypted?: boolean;
  accessLevel: "full" | "partial" | "restricted";
}

const BalanceCard = ({ title, balance, usdValue, isEncrypted = true, accessLevel }: BalanceCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const getAccessBadge = () => {
    switch (accessLevel) {
      case "full":
        return <Badge className="bg-success/20 text-success border-success/30">Full Access</Badge>;
      case "partial":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Partial Access</Badge>;
      case "restricted":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Restricted</Badge>;
    }
  };

  const renderBalance = () => {
    if (accessLevel === "restricted") {
      return "••••••••";
    }
    if (isEncrypted && !isRevealed) {
      return "••••••••";
    }
    return balance;
  };

  return (
    <Card className="relative group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card via-card/95 to-muted/20 border-border/50 hover:border-primary/30 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-vault-glow/5 via-transparent to-encryption-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Security grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--primary)) 10px, hsl(var(--primary)) 11px)`
      }}></div>

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <LockIcon className="w-4 h-4 text-primary animate-encryption-pulse" />
            {title}
          </CardTitle>
          {getAccessBadge()}
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-bold font-mono tracking-wider">
              {renderBalance()}
            </p>
            <p className="text-sm text-muted-foreground">
              ≈ ${isEncrypted && !isRevealed && accessLevel !== "restricted" ? "•••••" : usdValue}
            </p>
          </div>
          
          {accessLevel !== "restricted" && (
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              {isRevealed ? (
                <EyeOffIcon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="w-4 h-4 text-primary" />
              )}
            </button>
          )}
        </div>

        {/* Security indicator */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-success">
            <ShieldCheckIcon className="w-3 h-3" />
            <span>Encrypted</span>
          </div>
          <div className="text-muted-foreground">
            Last updated: 2m ago
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const TreasuryDashboard = () => {
  const balances = [
    {
      title: "Total Treasury",
      balance: "2,847.62 ETH",
      usdValue: "7,234,521.43",
      accessLevel: "full" as const
    },
    {
      title: "Operating Fund",
      balance: "156.88 ETH",
      usdValue: "398,654.22",
      accessLevel: "partial" as const
    },
    {
      title: "Development Pool",
      balance: "892.34 ETH",
      usdValue: "2,267,432.11",
      accessLevel: "full" as const
    },
    {
      title: "Emergency Reserve",
      balance: "••••••••",
      usdValue: "••••••••",
      accessLevel: "restricted" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
          Treasury Overview
        </h2>
        <p className="text-muted-foreground">
          Real-time encrypted balance monitoring with governance-controlled access
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {balances.map((balance, index) => (
          <BalanceCard
            key={index}
            title={balance.title}
            balance={balance.balance}
            usdValue={balance.usdValue}
            accessLevel={balance.accessLevel}
          />
        ))}
      </div>
    </div>
  );
};