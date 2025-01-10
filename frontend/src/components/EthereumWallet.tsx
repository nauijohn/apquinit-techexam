// Import necessary libraries
import { ethers } from 'ethers';
import { useContext, useRef, useState } from 'react';
import Button from './ui/Button';
import { WalletAddressContext } from '../store/WalletAddressContextProvider';

const EthereumWallet: React.FC = () => {
  const { walletAddress, setWalletAddress } = useContext(WalletAddressContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // const [defaultAccount, setDefaultAccount] = useState<string>('');
  const [balance, setBalance] = useState<string>('Not yet fetched');

  let provider: ethers.BrowserProvider;
  if (window.ethereum) provider = new ethers.BrowserProvider(window.ethereum);
  else dialogRef.current?.showModal();

  function connectWalletHandler() {
    if (!window.ethereum) dialogRef.current?.showModal();
    else {
      async function requestEthereum() {
        try {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
        } catch (error) {
          console.error(error);
        }
      }
      requestEthereum();
    }
  }

  function getBalanceHandler() {
    async function getBalance() {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const feeData = await provider.getFeeData();
      if (feeData) {
        console.log('feeData: ', feeData);
        const gasPrice = feeData.gasPrice;
        console.log('gasPrice: ', gasPrice);
      }
      // const transactionCount = await provider.getTransactionCount(address);
      // console.log("transactionCount: ", transactionCount);
      // const currentBlock = await provider.getBlockNumber();
      // console.log("currentBlock: ", currentBlock);

      // const blockByNumber = await provider.send("eth_getBlockByNumber", [
      //   "pending",
      //   false,
      // ]);
      // console.log("blockByNumber: ", blockByNumber);

      // const transactions = blockByNumber.transactions;
      // console.log("transactions: ", transactions);

      setBalance(ethers.formatEther(balance));
    }

    getBalance();
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className="rounded-lg p-6 bg-white shadow-lg border border-gray-300 max-w-md w-full transform transition-all scale-100"
      >
        <h2 className="text-2xl font-bold mb-4">Please install MetaMask</h2>
        <form method="dialog">
          <Button>Close</Button>
        </form>
      </dialog>
      <div className="flex flex-col justify-center items-center w-full max-w-md min-h-50 bg-gray-500 rounded-lg shadow-md p-5 m-5">
        <h1 className="text-2xl font-bold mb-4">My Ethereum Wallet</h1>
        <Button onClick={connectWalletHandler}>Connect Wallet</Button>
        {walletAddress && (
          <>
            <p className="text-lg m-4">Wallet: {walletAddress}</p>
            <Button onClick={getBalanceHandler}>Get Balance</Button>
            <p className="text-lg m-4">Balance: {balance}</p>
          </>
        )}
      </div>
    </>
  );
};

export default EthereumWallet;
