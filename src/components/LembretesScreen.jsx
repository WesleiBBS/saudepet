import { useState } from 'react'
import { Bell, Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { AddReminderModal } from './AddReminderModal.jsx'
import { usePetHealthData } from '../hooks/useLocalStorage.js'

export function LembretesScreen() {
  const { reminders, setReminders } = usePetHealthData()
  const [showAddModal, setShowAddModal] = useState(false)

  const addReminder = (newReminder) => {
    setReminders(prev => [...prev, newReminder])
  }

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  const getDaysUntilDue = (dateString) => {
    const today = new Date()
    const dueDate = new Date(dateString)
    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const activeReminders = reminders.filter(r => !r.completed)
  const completedReminders = reminders.filter(r => r.completed)

  return (
    <div className="space-y-6">
      <div className="neuro-header">
        <h2 className="text-2xl font-bold text-gray-800">
          <Bell className="h-6 w-6 mr-2 inline-block" />
          Lembretes
        </h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="neuro-button-primary"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Novo Lembrete</span>
        </button>
      </div>

      {/* Lembretes Ativos */}
      <div className="neuro-card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pendentes</h3>
        <div className="neuro-list">
          {activeReminders.map((reminder) => {
            const daysUntil = getDaysUntilDue(reminder.dueDate)
            return (
              <div key={reminder.id} className="neuro-list-item">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">{reminder.petName}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`neuro-badge ${
                      reminder.priority === 'alta' ? 'warning' : 
                      reminder.priority === 'média' ? 'info' : 'success'
                    }`}>
                      {reminder.priority}
                    </span>
                    {daysUntil <= 3 && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-900">{reminder.title}</h5>
                  <p className="text-sm text-gray-600">{reminder.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(reminder.dueDate)}</span>
                      {daysUntil === 0 && <span className="text-red-600 font-medium">(Hoje)</span>}
                      {daysUntil === 1 && <span className="text-orange-600 font-medium">(Amanhã)</span>}
                      {daysUntil > 1 && <span className="text-gray-500">({daysUntil} dias)</span>}
                      {daysUntil < 0 && <span className="text-red-600 font-medium">(Atrasado)</span>}
                    </div>
                    
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className="neuro-button"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Concluir
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {activeReminders.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum lembrete pendente</p>
          </div>
        )}
      </div>

      {/* Lembretes Concluídos */}
      {completedReminders.length > 0 && (
        <div className="neuro-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Concluídos</h3>
          <div className="neuro-list">
            {completedReminders.map((reminder) => (
              <div key={reminder.id} className="neuro-list-item opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{reminder.petName}</h4>
                    <p className="text-sm text-gray-600">{reminder.title}</p>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(reminder.dueDate)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className="neuro-button"
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Reativar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AddReminderModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addReminder}
      />
    </div>
  )
}
