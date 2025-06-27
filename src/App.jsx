import { useState } from 'react'
import { Navigation } from './components/Navigation.jsx'
import { AgendaScreen } from './components/AgendaScreen.jsx'
import { LembretesScreen } from './components/LembretesScreen.jsx'
import { ProntuarioScreen } from './components/ProntuarioScreen.jsx'
import { PWAInstallPrompt } from './components/PWAInstallPrompt.jsx'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('agenda')

  const renderScreen = () => {
    switch (activeTab) {
      case 'agenda':
        return <AgendaScreen />
      case 'lembretes':
        return <LembretesScreen />
      case 'prontuario':
        return <ProntuarioScreen />
      default:
        return <AgendaScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-4xl mx-auto">
        {renderScreen()}
      </main>
      <PWAInstallPrompt />
    </div>
  )
}

export default App

