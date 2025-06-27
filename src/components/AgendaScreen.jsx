import { useState } from 'react'
import { Calendar, Plus, Clock, MapPin } from 'lucide-react'
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
    <div className="space-y-6">
      <div className="neuro-header">
        <h2 className="text-2xl font-bold text-gray-800">
          <Calendar className="h-6 w-6 mr-2 inline-block" />
          Agenda
        </h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="neuro-button-primary"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Nova Consulta</span>
        </button>
      </div>

      <div className="neuro-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="neuro-list-item">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{appointment.petName}</h3>
              <span className={`neuro-badge ${appointment.status === 'agendado' ? 'info' : 'success'}`}>
                {appointment.status}
              </span>
            </div>
            
            <div className="space-y-2">
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
            </div>
          </div>
        ))}
      </div>

      {appointments.length === 0 && (
        <div className="neuro-card text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Nenhuma consulta agendada
          </h3>
          <p className="text-gray-600 mb-4">
            Agende a primeira consulta do seu pet
          </p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="neuro-button-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agendar Consulta
          </button>
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

