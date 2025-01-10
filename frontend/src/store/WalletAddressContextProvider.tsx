import { createContext, Dispatch, useState } from 'react';

export const WalletAddressContext = createContext<{
  walletAddress: string;
  setWalletAddress: Dispatch<React.SetStateAction<string>>;
}>({
  walletAddress: '',
  setWalletAddress: () => {},
});

export default function WalletAddressContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [walletAddress, setWalletAddress] = useState<string>('');

  return (
    <WalletAddressContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletAddressContext.Provider>
  );
}
