# Decentralized Voting App

This project is a decentralized voting application built using Solidity and Next.js. The app allows users to vote for candidates in a transparent and secure manner using their cryptocurrency wallets. The owner of the contract has the ability to list voters and candidates, while registered voters can cast their votes for their preferred candidates.

## Features

- **Candidate Registration:** The contract owner can add candidates who will be available for voting.
- **Voter Registration:** The contract owner can register eligible voters.
- **Secure Voting:** Registered voters can vote for their preferred candidate through their connected cryptocurrency wallet.
- **Transparency:** All voting data is stored on the blockchain, ensuring transparency and immutability.
- **Decentralized:** The app leverages blockchain technology to eliminate the need for a centralized authority.

## Technology Stack

- **Solidity:** The smart contract is written in Solidity, which handles the core voting logic.
- **Next.js:** The front-end is built with Next.js, a React framework that provides a seamless user experience.
- **Web3.js:** Interacts with the Ethereum blockchain to handle transactions and contract interactions.
- **MetaMask:** Users connect to the app through their MetaMask wallet, enabling secure and decentralized voting.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/voting-app.git
   
2. Navigate to the project directory:

   ```bash
   cd voting-app

3. Install dependencies:

   ```bash
   npm install

4. Compile the smart contract:

   ```bash
   npx hardhat compile

5. Deploy the smart contract:

   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>

6. Start the development server:

   ```bash
   npm run dev

Open your browser and navigate to http://localhost:3000 to view the app.

Usage
Owner:

List the candidates who will be available for voting.
Register the voters who are eligible to participate in the voting process.
Voters:

Connect your wallet using MetaMask.
Cast your vote for the desired candidate.
