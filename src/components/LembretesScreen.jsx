import { useState } from 'react'
import { Bell, Plus, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'média': return 'bg-yellow-100 text-yellow-800'
      case 'baixa': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Lembretes</h2>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Novo Lembrete</span>
        </Button>
      </div>

      {/* Lembretes Ativos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Pendentes</h3>
        {activeReminders.map((reminder) => {
          const daysUntil = getDaysUntilDue(reminder.dueDate)
          return (
            <Card key={reminder.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{reminder.petName}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(reminder.priority)}`}>
                      {reminder.priority}
                    </span>
                    {daysUntil <= 3 && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{reminder.title}</h4>
                  {reminder.description && (
                    <p className="text-sm text-gray-600">{reminder.description}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {formatDate(reminder.dueDate)}
                      {daysUntil === 0 && <span className="text-red-600 font-medium"> (Hoje!)</span>}
                      {daysUntil === 1 && <span className="text-orange-600 font-medium"> (Amanhã)</span>}
                      {daysUntil > 1 && <span> (em {daysUntil} dias)</span>}
                      {daysUntil < 0 && <span className="text-red-600 font-medium"> (Atrasado)</span>}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleReminder(reminder.id)}
                  >
                    Marcar como Feito
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Lembretes Concluídos */}
      {completedReminders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Concluídos</h3>
          {completedReminders.map((reminder) => (
            <Card key={reminder.id} className="opacity-75">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">{reminder.petName} - {reminder.title}</h4>
                      <p className="text-sm text-gray-600">{formatDate(reminder.dueDate)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleReminder(reminder.id)}
                  >
                    Desfazer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum lembrete criado
          </h3>
          <p className="text-gray-500 mb-4">
            Crie lembretes para não esquecer dos cuidados do seu pet
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar Lembrete
          </Button>
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

