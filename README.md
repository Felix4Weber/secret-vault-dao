# Secret Vault DAO

A privacy-preserving DAO treasury management platform using Fully Homomorphic Encryption (FHE) technology. This platform enables confidential voting and treasury allocation while maintaining complete privacy of member votes and financial decisions.

## Features

- **FHE-Encrypted Voting**: All votes are encrypted using FHE, ensuring complete privacy
- **Treasury Management**: Secure allocation and management of DAO funds
- **Member Reputation System**: Dynamic reputation-based voting power
- **Proposal System**: Create and execute treasury proposals with encrypted voting
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, and other popular wallets

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Blockchain**: Ethereum Sepolia Testnet
- **FHE**: Zama FHEVM for encrypted computations
- **Wallets**: RainbowKit, Wagmi, Viem
- **Smart Contracts**: Solidity with FHE capabilities

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Felix4Weber/secret-vault-dao.git
cd secret-vault-dao
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### Smart Contract Deployment

1. Compile contracts:
```bash
npm run compile
```

2. Deploy to Sepolia testnet:
```bash
npm run deploy
```

## Environment Variables

```env
# Network Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Private Key for Contract Deployment
PRIVATE_KEY=your_private_key_here

# Etherscan API Key for Contract Verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

## Smart Contract Features

### SecretVaultDAO Contract

- **Encrypted Proposals**: Create treasury proposals with encrypted amounts
- **Private Voting**: Cast votes using FHE encryption
- **Reputation System**: Dynamic voting power based on member reputation
- **Treasury Management**: Secure fund allocation and withdrawal
- **Quorum Requirements**: Configurable voting thresholds

### Key Functions

- `createProposal()`: Create encrypted treasury proposals
- `castVote()`: Vote on proposals with FHE encryption
- `executeProposal()`: Execute passed proposals
- `joinDAO()`: Join the DAO as a member
- `updateReputation()`: Update member reputation (verifier only)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run compile` - Compile smart contracts
- `npm run test` - Run contract tests
- `npm run deploy` - Deploy contracts to Sepolia

### Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Application pages
└── assets/             # Static assets

contracts/
├── SecretVaultDAO.sol  # Main FHE contract
└── ...

scripts/
├── deploy.ts           # Deployment script
└── ...
```

## Security

This project uses FHE (Fully Homomorphic Encryption) to ensure complete privacy of voting and treasury operations. All sensitive data is encrypted and computations are performed on encrypted data without decryption.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub.

## Acknowledgments

- Zama for FHEVM technology
- OpenZeppelin for secure contract libraries
- Rainbow for wallet integration
- The Ethereum community for blockchain infrastructure