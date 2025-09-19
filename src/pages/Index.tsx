import { useAccount } from 'wagmi';
import { Header } from "@/components/Header";
import { TreasuryDashboard } from "@/components/TreasuryDashboard";
import { AllocationChart } from "@/components/AllocationChart";
import { TreasureFooter } from "@/components/TreasureFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import treasuryHero from "@/assets/treasury-hero.png";
import { WalletIcon, KeyIcon, DatabaseIcon, LockIcon } from "lucide-react";

const Index = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <Header />
        
        {/* Hero Section */}
        <main className="container mx-auto px-6 py-12">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-muted/20 shadow-2xl">
            {/* Hero Image Background */}
            <div className="absolute inset-0">
              <img 
                src={treasuryHero} 
                alt="Encrypted DAO Treasury Vault" 
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>
            </div>
            
            {/* Security Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, hsl(var(--primary)) 20px, hsl(var(--primary)) 22px)`
            }}></div>

            <div className="relative z-10 text-center py-24 px-8 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-vault-glow bg-clip-text text-transparent leading-tight">
                  Confidential DAO Treasury
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                  Encrypted treasury management with governance-controlled access. 
                  Secure your DAO's digital assets with zero-knowledge protocols.
                </p>
              </div>

              {/* Access Required Notice */}
              <Card className="max-w-md mx-auto bg-card/80 backdrop-blur-sm border-warning/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-center gap-2 text-warning">
                    <LockIcon className="w-5 h-5" />
                    Wallet Access Required
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Connect your governance-approved wallet to access encrypted treasury data and allocation controls.
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-vault-glow text-primary-foreground hover:from-primary/90 hover:to-vault-glow/90 transition-all duration-300 shadow-lg hover:shadow-xl animate-vault-glow"
                    size="lg"
                  >
                    <WalletIcon className="w-5 h-5 mr-2" />
                    Connect Wallet
                  </Button>
                </CardContent>
              </Card>

              {/* Core Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 transition-all">
                  <KeyIcon className="w-10 h-10 text-primary animate-encryption-pulse" />
                  <h3 className="font-semibold text-lg">FHE Encryption</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Fully homomorphic encryption for complete privacy
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 transition-all">
                  <DatabaseIcon className="w-10 h-10 text-vault-glow animate-vault-glow" />
                  <h3 className="font-semibold text-lg">Encrypted Storage</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Private data storage with zero-knowledge proofs
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 transition-all">
                  <WalletIcon className="w-10 h-10 text-success animate-value-count" />
                  <h3 className="font-semibold text-lg">Multi-Wallet</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Connect with Rainbow, MetaMask, and other wallets
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <TreasureFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-6 py-12 space-y-12">
        {/* Welcome Message */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-success mb-4">
            <KeyIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Encrypted Connection Established</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-vault-glow bg-clip-text text-transparent">
            Welcome to Your Treasury
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access your encrypted DAO treasury dashboard with real-time balance monitoring and allocation management.
          </p>
        </div>

        {/* Treasury Dashboard */}
        <TreasuryDashboard />

        {/* Allocation Chart */}
        <AllocationChart />
      </main>

      <TreasureFooter />
    </div>
  );
};

export default Index;
