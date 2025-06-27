import { Calendar, Bell, FileText, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'lembretes', label: 'Lembretes', icon: Bell },
    { id: 'prontuario', label: 'Prontuário', icon: FileText },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">PetHealth</h1>
        </div>
      </div>
      
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}

