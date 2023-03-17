import Web3 from "web3";

// ...

async function handleConnectWallet() {
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new Web3(window.ethereum);
      // Replace "YOUR_WEB3_PROVIDER_URL" with your actual Web3 provider URL
      const web3 = new Web3("https://sphinx.shardeum.org/");
      setWeb3(web3);
      setAccounts(await web3.eth.getAccounts());
      setStatus("👆🏽 Write a message in the Ethereum blockchain!");
    } catch (error) {
      console.error(error);
      setStatus("❌ " + error.message);
    }
  } else {
    setStatus("❌ Please install MetaMask to use this dApp!");
  }
}
