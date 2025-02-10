import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes } from '@/routes/routes'
import { AuthProvider } from "@/components/contexts/AuthContext"

const queryClient = new QueryClient()

function App() {
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes />
      </div>
    </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
