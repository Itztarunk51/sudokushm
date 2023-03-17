import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PlaySudokuContract from './contract/PlaySudoku.json';

import ConnectWalletButton from './components/ConnectWalletButton';
import CurrentBoard from './components/CurrentBoard';
import DidThePlayerWin from './components/DidThePlayerWin';
import ComputeBruteForceWinButton from './components/ComputeBruteForceWinButton';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [isWinning, setIsWinning] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3);
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = PlaySudokuContract.networks[networkId];
          const contract = new web3.eth.Contract(
            PlaySudokuContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          setContract(contract);
        } catch (error) {
          console.error(error);
        }
      } else {
        window.alert('Please install MetaMask to use this app!');
      }
    };
    loadWeb3();
  }, []);

  const computeBruteForceWin = async () => {
    if (contract) {
      try {
        const result = await contract.methods.computeBruteForceWin(puzzle).call({ from: account });
        setSolution(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const didThePlayerWin = async () => {
    if (contract) {
      try {
        const result = await contract.methods.didThePlayerWin(account).call({ from: account });
        setIsWinning(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <h1>PlaySudoku</h1>
      <ConnectWalletButton web3={web3} setAccount={setAccount} />
      <CurrentBoard puzzle={puzzle} setPuzzle={setPuzzle} solution={solution} />
      <DidThePlayerWin isWinning={isWinning} didThePlayerWin={didThePlayerWin} />
      <ComputeBruteForceWinButton computeBruteForceWin={computeBruteForceWin} />
    </div>
  );
}

export default App;
