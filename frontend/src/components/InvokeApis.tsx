import axios from 'axios';
import { useContext, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { WalletAddressContext } from '../store/WalletAddressContextProvider';
import Button from './ui/Button';

async function fetchCurrentGasPrice(resource: string) {
  const response = await axios.get(
    `${process.env.VITE_API_BASE_URL}/ethereum/${resource}/gas-price`,
  );
  return response;
}

async function fetchCurrentBlockNumber() {
  const response = await axios.get(
    `${process.env.VITE_API_BASE_URL}/ethereum/etherscan/block-number`,
  );
  return response;
}

async function fetchWalletBalance(walletAddress: string) {
  const response = await axios.get(
    `${process.env.VITE_API_BASE_URL}/ethereum/etherscan/${walletAddress}/balance`,
  );
  return response;
}

const InvokeApis: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { walletAddress } = useContext(WalletAddressContext);
  const [selectedTab, setSelectedTab] = useState('etherscan');

  const currentGasPriceQuery = useQuery({
    queryKey: ['gas-price'],
    queryFn: () => fetchCurrentGasPrice(selectedTab),
    enabled: false,
  });
  console.log('currentGasPriceQuery: ', currentGasPriceQuery.data);

  const currentBlockNumberQuery = useQuery({
    queryKey: ['block-number'],
    queryFn: fetchCurrentBlockNumber,
    enabled: false,
  });

  const walletBalanceQuery = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: () => fetchWalletBalance(walletAddress),
    enabled: false,
  });

  const tabs = [
    { name: 'Ethereum Scan', url: 'etherscan' },
    { name: 'Tab 2', url: "This is Tab 2's content." },
    { name: 'Tab 3', url: "This is Tab 3's content." },
  ];

  function getGasPriceHandler() {
    currentGasPriceQuery.refetch();
  }

  function getCurrentBlockNumberHandler() {
    currentBlockNumberQuery.refetch();
  }

  function getWalletBalanceHandler() {
    walletBalanceQuery.refetch();
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
        <h2 className="text-2xl font-bold mb-4">Please select resource</h2>
        {/* Tab Selector */}
        <div className="flex space-x-4 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.name}
              className={`px-4 py-2 rounded font-medium ${
                selectedTab === tab.url
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedTab(tab.url)}
            >
              {tab.name}
            </Button>
          ))}
        </div>
        {/* Print Button */}
        <div className="flex flex-col gap-5">
          <Button onClick={getGasPriceHandler}>Get Current Gas Price</Button>
          <Button onClick={getCurrentBlockNumberHandler}>
            Get Current Block Number
          </Button>
          <Button onClick={getWalletBalanceHandler}>
            Get Wallet Address Balance
          </Button>
        </div>

        {
          <p className=" m-4">
            Current Gas Price:{' '}
            {currentGasPriceQuery.data
              ? currentGasPriceQuery.data?.data.result
              : currentGasPriceQuery.isFetching
              ? 'Fetching...'
              : currentGasPriceQuery.isError
              ? 'Error on fetch'
              : 'Not fetched yet'}
          </p>
        }
        {
          <p className=" m-4">
            Current Block Number:{' '}
            {currentBlockNumberQuery.data
              ? currentBlockNumberQuery.data?.data.result
              : currentBlockNumberQuery.isFetching
              ? 'Fetching...'
              : currentBlockNumberQuery.isError
              ? 'Error on fetch'
              : 'Not fetched yet'}
          </p>
        }
        {
          <p className=" m-4">
            Current Wallet Balance:{' '}
            {walletBalanceQuery.data
              ? walletBalanceQuery.data?.data.result
              : walletBalanceQuery.isFetching
              ? 'Fetching...'
              : walletBalanceQuery.isError
              ? 'Error on fetch'
              : 'Not fetched yet'}
          </p>
        }
      </div>
    </>
  );
};

export default InvokeApis;
