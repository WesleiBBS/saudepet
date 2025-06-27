import { Calendar, Bell, FileText, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'lembretes', label: 'Lembretes', icon: Bell },
    { id: 'prontuario', label: 'Prontuário', icon: FileText },
  ]

  return (
    <nav className="neuro-header">
      <div className="flex items-center space-x-3">
        <div className="neuro-icon">
          <Heart className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 gradient-text">PetHealth</h1>
      </div>
      
      <div className="neuro-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`neuro-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

