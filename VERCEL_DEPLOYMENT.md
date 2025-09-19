# Vercel Deployment Guide for Secret Vault DAO

This guide provides step-by-step instructions for deploying the Secret Vault DAO application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, search for `Felix4Weber/secret-vault-dao`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite project

### 3. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### 4. Deploy Configuration

#### Vercel Configuration File
The project includes a `vercel.json` file with the following configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 5. Domain Configuration

#### Custom Domain (Optional)
1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Configure DNS records as instructed
4. Enable SSL certificate

#### Default Domain
Vercel will provide a default domain like: `secret-vault-dao-xxx.vercel.app`

### 6. Build and Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for build process to complete
3. Monitor build logs for any errors
4. Once deployed, test the application

### 7. Post-Deployment Configuration

#### Smart Contract Deployment
1. Deploy contracts to Sepolia testnet:
```bash
npm run deploy
```

2. Update contract addresses in the frontend if needed

#### Environment Variables Verification
Verify all environment variables are correctly set:
- Check Vercel dashboard > Settings > Environment Variables
- Ensure all variables are available in production

### 8. Testing Deployment

#### Frontend Testing
1. Visit the deployed URL
2. Test wallet connection
3. Verify all features work correctly
4. Check console for any errors

#### Smart Contract Testing
1. Connect wallet to Sepolia testnet
2. Test contract interactions
3. Verify FHE operations work correctly

### 9. Monitoring and Maintenance

#### Performance Monitoring
- Use Vercel Analytics (if enabled)
- Monitor Core Web Vitals
- Check for any performance issues

#### Error Monitoring
- Monitor Vercel function logs
- Set up error tracking if needed
- Monitor smart contract events

### 10. Security Considerations

#### Environment Variables
- Never commit sensitive keys to repository
- Use Vercel's environment variable system
- Rotate keys regularly

#### Smart Contract Security
- Verify contracts on Etherscan
- Test thoroughly on testnet
- Consider security audits for mainnet

## Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for TypeScript errors

#### Environment Variables
- Ensure all required variables are set
- Check variable names match exactly
- Verify values are correct

#### Wallet Connection Issues
- Verify WalletConnect project ID
- Check RPC URL configuration
- Test with different wallets

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Wagmi Documentation](https://wagmi.sh/)

## Deployment Checklist

- [ ] Repository imported to Vercel
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Domain configured (if custom)
- [ ] Build successful
- [ ] Frontend accessible
- [ ] Wallet connection working
- [ ] Smart contracts deployed
- [ ] All features tested
- [ ] Performance optimized
- [ ] Security measures in place

## Next Steps

After successful deployment:

1. **Monitor Performance**: Use Vercel Analytics to track usage
2. **Update Documentation**: Keep README and deployment docs current
3. **Set Up CI/CD**: Configure automatic deployments from main branch
4. **Security Audit**: Consider professional security review
5. **User Testing**: Gather feedback and iterate

## Support

For deployment issues:
- Check Vercel dashboard logs
- Review GitHub repository for latest changes
- Contact development team for assistance

---

**Note**: This deployment guide is specific to the Secret Vault DAO project. Adjust configurations as needed for your specific requirements.
