import HomaPage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return <>
    <QueryClientProvider client={queryClient}>
      <HomaPage/>
    </QueryClientProvider>
  </>;
}

export default App;
