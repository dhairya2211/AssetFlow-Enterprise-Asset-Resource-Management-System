import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/routes'

/**
 * Root application component.
 * Wires the router — all page rendering happens via AppRoutes.
 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
