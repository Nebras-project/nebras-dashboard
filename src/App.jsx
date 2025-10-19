import { useTheme, useLanguage, useSidebar, useUser } from './hooks/useRedux'

function App() {
  const { mode, toggleTheme } = useTheme()
  const { currentLanguage, toggleLanguage } = useLanguage()
  const { isOpen, toggleSidebar } = useSidebar()
  const { isAuthenticated, userData } = useUser()

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
      color: mode === 'dark' ? '#ffffff' : '#000000',
      minHeight: '100vh'
    }}>
      <h1>Nebras Dashboard</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Redux Store Test</h2>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Theme:</strong> {mode} 
          <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>
            Toggle Theme
          </button>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Language:</strong> {currentLanguage} 
          <button onClick={toggleLanguage} style={{ marginLeft: '10px' }}>
            Toggle Language
          </button>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Sidebar:</strong> {isOpen ? 'Open' : 'Closed'} 
          <button onClick={toggleSidebar} style={{ marginLeft: '10px' }}>
            Toggle Sidebar
          </button>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <strong>Authentication:</strong> {isAuthenticated ? 'Logged In' : 'Not Logged In'}
        </div>
      </div>
      
      <p>Redux store is working correctly! 🎉</p>
    </div>
  )
}

export default App

