# ♻️ Borla2Earn – Turning Waste into Wealth on the Blockchain

*A decentralized waste management platform empowering communities through blockchain technology*

## 💡 Overview

Borla2Earn is a revolutionary decentralized waste management application (DApp) addressing Ghana's waste disposal challenges through blockchain technology. By participating, individuals can recycle waste (plastics, bottles, etc.) at collection centers and earn BORLA tokens as rewards. This initiative promotes sustainability, empowers communities, and contributes to a cleaner environment.

---

## 🔥 Why Borla2Earn?

- ✅ **Earn tokens** for eco-friendly actions
- 🌍 **Promote sustainable** waste disposal
- 🏘️ **Empower underserved** communities
- 📈 **Aligns with UN** Sustainable Development Goals
- 💸 **Turn trash into tokens**, and tokens into opportunities

Borla2Earn is more than waste management—it's a movement for sustainability and shared prosperity.

---

## 🪙 Introducing the $BORLA Token

The BORLA Token powers our ecosystem. Users earn $BORLA by submitting verified waste, which can be redeemed or traded for goods, services, or fiat currency.

### Token Utility:
- 🎁 Rewards for verified waste submissions
- 🏆 Leaderboard bonuses and achievements
- 🛍️ Partner discounts and marketplace access
- 🗳️ Community governance (future updates)

---

## 🔧 Tech Stack

### 🌐 Frontend & Backend
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel

### 🔗 Blockchain & Web3
- **Ethereum Provider**: Wagmi + Viem
- **Wallet Connection**: Web3Modal (WalletConnect)
- **Blockchain Network**: ApeChain (Avalanche Subnet)
- **Smart Contracts**: Solidity (EVM-compatible)

### 📱 Key Features
- 🔐 Secure wallet connection
- 🔄 Token transactions on ApeChain
- 📊 Transaction history and tracking
- 🌐 Multi-chain ready architecture
- 🔒 Secure smart contract interactions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Git
- A WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/borla2earn.git
   cd borla2earn
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your WalletConnect Project ID and other required variables

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# ApeChain Configuration
NEXT_PUBLIC_APECHAIN_RPC_URL=https://curtis.rpc.caldera.xyz/http
NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=0x04b4D278b879954c1190d583526244100FB78006
NEXT_PUBLIC_APECHAIN_CHAIN_ID=33111
NEXT_PUBLIC_APECHAIN_BLOCK_EXPLORER=https://curtis.apescan.io/

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/borla2earn?schema=public"
```

---

## 🛠️ Smart Contract Integration

The application integrates with the BORLA token smart contract on ApeChain. The main contract interactions include:

- Checking token balances
- Transferring tokens
- Depositing/withdrawing from the escrow contract
- Viewing transaction history

### Smart Contract Addresses
- **BORLA Token**: `0x04b4D278b879954c1190d583526244100FB78006` (ApeChain)

### Interacting with the Contract

Use the `useEscrow` hook to interact with the smart contract:

```typescript
import { useEscrow } from '@/hooks/useEscrowContract';

function MyComponent() {
  const { balance, depositFunds, isDepositing } = useEscrow();
  
  return (
    <div>
      <p>Your Balance: {balance?.toString()} BORLA</p>
      <button 
        onClick={() => depositFunds(BigInt(1e18))} // 1 BORLA
        disabled={isDepositing}
      >
        {isDepositing ? 'Depositing...' : 'Deposit 1 BORLA'}
      </button>
    </div>
  );
}
```

---

## 🌐 Wallet Connection

The application supports connecting with various Web3 wallets through WalletConnect. Users can connect their preferred wallet to interact with the BORLA token and other blockchain features.

### Supported Wallets
- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- And other WalletConnect-compatible wallets

### Adding a Wallet Button

To add a wallet connection button to any component:

```typescript
import { WalletConnectButton } from '@/components/web3/wallet-connect-button';

function MyComponent() {
  return (
    <div>
      <WalletConnectButton />
    </div>
  );
}
```

---

## 🧪 Testing

Run the test suite:

```bash
pnpm test
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- ApeChain for the testnet infrastructure
- The Web3 community for amazing tools and libraries
- All contributors who help make this project better

### 🔐 Current Features (Production Ready)
- ✅ User authentication and profiles
- ✅ Real-time waste submission tracking
- ✅ Collection center mapping
- ✅ Admin verification dashboard
- ✅ Token transaction history
- ✅ Achievement system
- ✅ Leaderboard rankings
- ✅ Responsive mobile design

### 📡 Planned Blockchain Integration
- **Platform**: Celo / Polygon / Ethereum (TBD)
- **Smart Contracts**: Solidity
- **Wallet Integration**: MetaMask / WalletConnect

---

## 🌱 Our Impact – Aligned with the SDGs

Borla2Earn supports these UN Sustainable Development Goals:

| **UN SDG**                          | **Our Contribution**                       |
| ----------------------------------- | ------------------------------------------ |
| **SDG 11 – Sustainable Cities**     | Clean communities through waste collection |
| **SDG 12 – Responsible Production** | Promotes recycling and reuse               |
| **SDG 1 – No Poverty**              | Creates earning opportunities via waste    |
| **SDG 3 – Good Health**             | Reduces disease linked to waste buildup    |
| **SDG 13 – Climate Action**         | Mitigates waste-related emissions          |

---

## 🚀 How It Works

1. **Sign Up** on the web app with email/password
2. **Find Collection Centers** using our interactive map
3. **Submit Waste** with photos and details
4. **Admin Verification** approves submissions
5. **Earn $BORLA Tokens** automatically
6. **Track Progress** via your personal dashboard
7. **Compete** on leaderboards and unlock achievements

---

## 🏗️ Project Status & Recent Updates

### ✅ **Phase 1: MVP Complete (Current)**
- Full-stack web application with Supabase backend
- User authentication and profile management
- Waste submission and verification system
- Admin dashboard for managing submissions
- Real-time leaderboards and achievements
- Collection center mapping

### 🔄 **Phase 2: Blockchain Integration (In Progress)**
- Smart contract development for BORLA token
- Wallet integration (MetaMask/WalletConnect)
- Token distribution automation
- Decentralized verification mechanisms

### 🎯 **Phase 3: Mobile & Scaling (Planned)**
- React Native mobile application
- Advanced analytics dashboard
- Multi-language support
- Partnership integrations

---

## 🧭 Roadmap 2025

| Quarter | Milestone                                           |
| ------- | --------------------------------------------------- |
| **Q1**  | ✅ MVP launch (Next.js + Supabase)                 |
| **Q2**  | 🔄 Blockchain integration & token launch           |
| **Q3**  | 📱 Mobile app & partner onboarding                 |
| **Q4**  | 🌍 Multi-city expansion & DAO governance           |

---

## 🛠️ Development Setup

To get started with development, follow these steps:

\`\`\`bash
# Clone the repository
git clone [https://github.com/NharnahQwami/Borla2Earn-v7.git](https://github.com/NharnahQwami/Borla2Earn-v7.git)

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# (See "Environment Variables Required" section below)

# Run development server
npm run dev
\`\`\`
---

## 🤝 Get Involved

### 👨‍💻 **For Developers**
- Contribute to smart contract development
- Improve UI/UX components
- Add new features and integrations
- Help with mobile app development

### 💰 **For Investors & Partners**
- Support scaling to other cities/countries
- Help BORLA token gain market traction
- Sponsor collection points or rewards
- Partner with local waste management companies

### 🌐 **For NGOs & Community Leaders**
- Launch local waste collection drives
- Use Borla2Earn to engage communities
- Provide feedback on user experience
- Help with community outreach

---

## 📊 Current Metrics

- 🏢 **4 Collection Centers** mapped and active
- 🏆 **5 Achievement Types** available
- 📱 **Responsive Design** for all devices
- ⚡ **Real-time Updates** via Supabase
- 🔐 **Secure Authentication** with RLS policies

---

## 🔗 Links & Resources

- 🤖 **GitHub**: [https://github.com/NharnahQwami/Borla2Earn-v7](https://github.com/NharnahQwami/Borla2Earn-v7)
- ✉️ **Contact**: team@borla2earn.io

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Join us in transforming waste into wealth—one token at a time.**

♻️ **BORLA2EARN** – Because your trash has value.
