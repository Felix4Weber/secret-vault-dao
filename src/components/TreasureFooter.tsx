import { useEffect, useState } from "react";
import { CoinsIcon, LockIcon, ShieldIcon } from "lucide-react";

interface TreasureChestProps {
  delay?: number;
}

const TreasureChest = ({ delay = 0 }: TreasureChestProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      // Generate coins with random delays
      const coinTimers = Array.from({ length: 8 }, (_, i) => 
        setTimeout(() => {
          setCoins(prev => [...prev, i]);
        }, i * 200)
      );

      return () => coinTimers.forEach(clearTimeout);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative w-20 h-16 mx-auto">
      {/* Treasure Chest Base */}
      <div className={`absolute bottom-0 w-full h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg border-2 border-amber-500 transition-all duration-1000 ${isAnimating ? 'animate-vault-glow' : ''}`}>
        {/* Chest Lock */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
          <LockIcon className="w-4 h-4 text-amber-300" />
        </div>
        
        {/* Chest Opening Glow */}
        {isAnimating && (
          <div className="absolute -top-1 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent animate-encryption-pulse"></div>
        )}
      </div>

      {/* Treasure Fill Animation */}
      <div className={`absolute bottom-1 left-1 right-1 h-10 bg-gradient-to-t from-primary via-vault-glow to-yellow-400 rounded transition-all duration-2000 ${isAnimating ? 'animate-treasure-fill opacity-80' : 'opacity-0 scale-y-0'}`}>
      </div>

      {/* Falling Coins */}
      {coins.map((coinIndex) => (
        <div
          key={coinIndex}
          className="absolute w-3 h-3 bg-gradient-to-br from-primary to-vault-glow rounded-full animate-coin-drop shadow-lg"
          style={{
            left: `${20 + (coinIndex * 8)}%`,
            top: '-20px',
            animationDelay: `${coinIndex * 0.1}s`,
            boxShadow: '0 0 8px hsl(var(--vault-glow) / 0.6)'
          }}
        >
          <CoinsIcon className="w-3 h-3 text-yellow-300" />
        </div>
      ))}
    </div>
  );
};

export const TreasureFooter = () => {
  return (
    <footer className="relative bg-gradient-to-t from-muted via-card/50 to-transparent border-t border-border/30 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, hsl(var(--secondary)) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        {/* Treasure Chests Animation */}
        <div className="mb-8">
          <div className="flex justify-center items-end space-x-8">
            <TreasureChest delay={0} />
            <TreasureChest delay={500} />
            <TreasureChest delay={1000} />
            <TreasureChest delay={1500} />
            <TreasureChest delay={2000} />
          </div>
        </div>

        {/* Footer Content */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-vault-glow to-secondary bg-clip-text text-transparent">
              Secure Treasury Management
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your DAO's treasury is protected by multi-signature governance, encryption protocols, 
              and decentralized consensus mechanisms ensuring maximum security for digital assets.
            </p>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 transition-all">
              <ShieldIcon className="w-8 h-8 text-success animate-encryption-pulse" />
              <h4 className="font-semibold">Multi-Sig Protection</h4>
              <p className="text-sm text-muted-foreground text-center">
                Governance-controlled access with cryptographic signatures
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 transition-all">
              <LockIcon className="w-8 h-8 text-primary animate-vault-glow" />
              <h4 className="font-semibold">Encrypted Ledgers</h4>
              <p className="text-sm text-muted-foreground text-center">
                Zero-knowledge proofs and encrypted balance monitoring
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 transition-all">
              <CoinsIcon className="w-8 h-8 text-vault-glow animate-value-count" />
              <h4 className="font-semibold">Real-time Tracking</h4>
              <p className="text-sm text-muted-foreground text-center">
                Live treasury monitoring with automated compliance
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-6 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              © 2024 Confidential DAO Treasury. Built with security and transparency in mind.
            </p>
          </div>
        </div>
      </div>

      {/* Security scan line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent">
        <div className="h-full w-32 bg-gradient-to-r from-transparent via-vault-glow to-transparent animate-secure-scan"></div>
      </div>
    </footer>
  );
};