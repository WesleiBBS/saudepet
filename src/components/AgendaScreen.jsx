import { useState } from 'react'
import { Calendar, Plus, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { AddAppointmentModal } from './AddAppointmentModal.jsx'
import { usePetHealthData } from '../hooks/useLocalStorage.js'

export function AgendaScreen() {
  const { appointments, setAppointments } = usePetHealthData()
  const [showAddModal, setShowAddModal] = useState(false)

  const addAppointment = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment])
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Agenda</h2>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Nova Consulta</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{appointment.petName}</CardTitle>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {appointment.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              {appointment.location && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
              )}
              <div className="mt-3">
                <p className="font-medium text-gray-900">{appointment.type}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma consulta agendada
          </h3>
          <p className="text-gray-500 mb-4">
            Agende a primeira consulta do seu pet
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Agendar Consulta
          </Button>
        </div>
      )}

      <AddAppointmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addAppointment}
      />
    </div>
  )
}

