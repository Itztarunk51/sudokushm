import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SudokuBoard from './components/SudokuBoard';
import ConnectWalletButton from './components/ConnectWalletButton';
import CurrentBoard from './components/CurrentBoard';
import DidThePlayerWin from './components/DidThePlayerWin';
import ComputeBruteForceWinButton from './components/ComputeBruteForceWinButton';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3);
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        setWeb3(window.web3);
      } else {
        console.error('No Ethereum browser extension detected, install MetaMask on your browser.');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        setCurrentAccount(accounts[0]);
      }
    };

    fetchAccounts();
  }, [web3]);

  return (
    <div>
      <h1>Play Sudoku</h1>
      <ConnectWalletButton
        web3={web3}
        accounts={accounts}
        setAccounts={setAccounts}
        setCurrentAccount={setCurrentAccount}
      />
      <SudokuBoard puzzle={puzzle} setPuzzle={setPuzzle} />
      <CurrentBoard puzzle={puzzle} solution={solution} />
      <DidThePlayerWin puzzle={puzzle} solution={solution} />
      <ComputeBruteForceWinButton
        web3={web3}
        puzzle={puzzle}
        setSolution={setSolution}
      />
      {currentAccount && (
        <p>Connected wallet address: {currentAccount}</p>
      )}
    </div>
  );
}

export default App;
