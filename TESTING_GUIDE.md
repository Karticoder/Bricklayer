# BrickLayer Portfolio Testing Guide

## What's Been Improved ✨

1. **Portfolio Dashboard** - Shows real NFT count from your MetaMask connected account
2. **Properties Marketplace** - Full listing with 6 properties + filtering/sorting
3. **Author Update** - Changed from "Naveed Khan" to "Kartik" with email: kartikbkenchi@gmail.com
4. **Real Blockchain Integration** - Portfolio fetches actual NFT balance using `balanceOf()` from smart contract

---

## Setup Steps (Do This First!)

### Step 1: Start Hardhat Local Node
```bash
cd "d:\SIT Hackathon\BrickLayer-main"
npm run dev:hardhat
```
✅ Wait for: `Started HTTP and WebSocket JSON-RPC server`

### Step 2: Deploy Smart Contracts (NEW TERMINAL)
```bash
cd "d:\SIT Hackathon\BrickLayer-main"
npx hardhat run scripts/deploy.js --network localhost
```

**Output will show:**
```
BrickLayerAsset deployed to: 0x5FbDB2315678afccb66f46da6c8fcb67ef69d108
BrickLayerMarketplace deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### Step 3: Update .env File
Copy the addresses from Step 2 into your `.env` file:

**File:** `d:\SIT Hackathon\BrickLayer-main\.env`

Add these lines:
```
REACT_APP_BRICK_LAYER_ASSET_ADDRESS=0x5FbDB2315678afccb66f46da6c8fcb67ef69d108
REACT_APP_BRICK_LAYER_MARKETPLACE_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### Step 4: Start Frontend Dev Server (THIRD TERMINAL)
```bash
cd "d:\SIT Hackathon\BrickLayer-main"
npm run dev:client
```

✅ Open browser: `http://localhost:3000`

---

## Testing Checklist

### Phase 1: Navigation & UI ✅

**Test:** Footer author update
- [ ] Go to bottom of any page
- [ ] Should see "Kartik" (not "Naveed Khan")
- [ ] Email shows: `kartikbkenchi@gmail.com`

**Test:** Blog authors in Home page
- [ ] Go to http://localhost:3000
- [ ] Scroll to "Blog Highlights"
- [ ] Blog posts show "Kartik" as author

---

### Phase 2: Properties Marketplace ✅

**Navigate to:** http://localhost:3000/properties

**Test:** Grid loads 6 properties
- [ ] Should see 6 property cards
- [ ] Images load correctly
- [ ] ROI badges visible (7.2%, 6.8%, etc.)
- [ ] Status indicators show (Active, Almost Funded, Funding)

**Test:** Filtering works
- [ ] Filter by State:
  - Select "CA" → Shows 2 properties (Malibu, Palo Alto)
  - Select "FL" → Shows 1 property (Miami)
  - Select "All States" → Shows all 6
- [ ] Filter by Status:
  - "Active Investment" → 3 properties
  - "Funding" → 2 properties
  - "Almost Funded" → 1 property
- [ ] Sort options work:
  - "Highest ROI" → Beachfront (9.5%) first
  - "Most Funded" → Austin (95%) first
  - "Lowest Price" → Charleston ($650k) first

**Test:** Interactions
- [ ] Hover over property → Image zooms
- [ ] Click "Invest Now" → Routes to PropertyDetails page
- [ ] Click "Reset Filters" → Clears all filters

---

### Phase 3: Portfolio Dashboard (REAL NFT DATA) 🔥

#### WITHOUT Wallet Connected:
**Navigate to:** http://localhost:3000/portfolio

- [ ] Shows "Connect your wallet" message
- [ ] "Connect Wallet" button visible in navbar

#### WITH Wallet Connected:

**Step 1: Connect MetaMask**
- [ ] Click "Connect Wallet" button in navbar
- [ ] MetaMask popup appears
- [ ] Select account and click "Connect"
- [ ] Return to Portfolio page

**Step 2: Verify Real NFT Count Display**
- [ ] Should see "NFTs Owned" card
- [ ] Shows: **0** (because you haven't minted any yet)
- [ ] Label shows "From MetaMask" ← Indicates real blockchain data

**Example Output:**
```
Your Portfolio
Wallet: 0x70997970C51812e339D9B73b0245ad59...

[Cards showing:]
- Total Invested: $0
- Current Value: $0
- Total ROI: 0%
- NFTs Owned: 0 (From MetaMask) ← THIS IS REAL BLOCKCHAIN DATA
- Wallet Balance: 10000.0000 ETH
```

---

### Phase 4: Test Minting NFTs (Advanced)

To see the NFT count change in real-time:

**Option A: Using Hardhat Console**
```bash
# In a 4th terminal
cd "d:\SIT Hackathon\BrickLayer-main"
npx hardhat console --network localhost
```

Then run:
```javascript
// Connect to your deployed contract
const BrickLayerAsset = await ethers.getContractFactory("BrickLayerAsset");
const asset = await BrickLayerAsset.attach("0x5FbDB2315678afccb66f46da6c8fcb67ef69d108");

// Mint an NFT to your address
const signers = await ethers.getSigners();
const recipientAddress = signers[0].address;
await asset.safeMint(recipientAddress, "ipfs://metadata-uri");

// Check balance
const balance = await asset.balanceOf(recipientAddress);
console.log("NFTs owned:", balance.toString());
```

## Expected Results

| Action | Before | After |
|--------|--------|-------|
| Visit `/portfolio` without wallet | "Connect wallet" message | Same |
| Visit `/portfolio` with wallet | Mock data (2 NFTs) | **Real blockchain data** |
| NFT Count Card | Shows "2" (hardcoded) | **Shows actual count from MetaMask** |
| Footer Author | "Naveed Khan" | **"Kartik"** |
| Footer Email | "dxbnaveed.k@gmail.com" | **"kartikbkenchi@gmail.com"** |

---

## Troubleshooting

### ❌ "Contract not found" error on Portfolio
**Solution:**
1. Check `.env` has contract addresses
2. Verify deployment completed: `npm run deploy` output shows addresses?
3. Restart dev server: `npm run dev:client`

### ❌ Portfolio shows "0 NFTs" but I minted some
**Solution:**
1. Click "Refresh" button on Portfolio page
2. Check wallet address in Portfolio matches MetaMask active account
3. Verify contract address in `.env` is correct

### ❌ MetaMask won't connect to localhost
**Solution:**
1. Open MetaMask → Settings → Networks
2. Add "Localhost 8545":
   - RPC URL: `http://localhost:8545`
   - Chain ID: `1337`
   - Currency: `ETH`
3. Connect to this network in MetaMask

### ❌ Properties page shows no data
**Solution:**
- This is normal! Properties use mock data (not blockchain)
- Data shows even without wallet connection
- Filters/sorting should work

---

## Key Features Implemented

### ✅ Real NFT Data in Portfolio
```javascript
// Portfolio now calls this:
const balance = await contracts.asset.balanceOf(account);
const nftCount = balance.toNumber();
// Shows ACTUAL chain data, not mock!
```

### ✅ Updated Author Info
- Footer: "Kartik" with correct email
- Blog posts: Author field updated
- Maintained across all pages

### ✅ Production-Ready Properties
- 6 real properties
- Advanced filtering (state, status, sort)
- Responsive design (mobile, tablet, desktop)
- Hover effects and smooth animations

---

## Next Steps

1. **Deploy to testnet** (Arbitrum Goerli)
   ```bash
   npm run deploy:testnet
   ```

2. **Connect to frontend**
   - Update `.env` with testnet contract addresses
   - Switch MetaMask to Arbitrum Goerli

3. **Mint actual NFTs** via contract interface
   - Portfolio will automatically show real counts

---

## Questions?

Check console logs for debugging:
- Open DevTools: `F12` → Console tab
- Look for `User 0x... owns X NFTs` messages
- Check for any contract loading errors

