import { ethers } from 'ethers';
import erc20abi from '../erc20ABI.json';
import { useRef, useState } from 'react';
import Button from './ui/Button';

export default function Contract() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [contractInfo, setContractInfo] = useState({
    address: '-',
    tokenName: '-',
    tokenSymbol: '-',
    totalSupply: '-',
  });

  let provider: ethers.BrowserProvider;
  if (window.ethereum) provider = new ethers.BrowserProvider(window.ethereum);
  else dialogRef.current?.showModal();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const erc20 = new ethers.Contract('someAddress', erc20abi, provider);

    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    setContractInfo({
      address: 'someAddress',
      tokenName,
      tokenSymbol,
      totalSupply,
    });
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
    </>
  );
}
