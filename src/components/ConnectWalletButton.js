import React from 'react';

function ConnectWalletButton({ web3, setAccount }) {
  const connectWallet = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  return (
    <div>
      {web3 && (
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWalletButton;
