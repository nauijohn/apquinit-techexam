import EthereumWallet from './components/EthereumWallet';
import InvokeApis from './components/InvokeApis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WalletAddressContextProvider from './store/WalletAddressContextProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center bg-gray-600 gap-y-6">
      <WalletAddressContextProvider>
        <EthereumWallet />
        <QueryClientProvider client={queryClient}>
          <InvokeApis />
        </QueryClientProvider>
      </WalletAddressContextProvider>
    </div>
  );
}

export default App;
