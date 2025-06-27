import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // Função para obter o valor inicial do localStorage
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Erro ao ler ${key} do localStorage:`, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(getStoredValue)

  // Função para atualizar o valor
  const setValue = (value) => {
    try {
      // Permite que value seja uma função como no useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error)
    }
  }

  // Sincronizar com mudanças no localStorage de outras abas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Erro ao sincronizar ${key}:`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}

// Hook específico para dados do app
export function usePetHealthData() {
  const [appointments, setAppointments] = useLocalStorage('petHealth_appointments', [
    {
      id: 1,
      petName: 'Rex',
      type: 'Consulta Veterinária',
      date: '2024-06-25',
      time: '14:30',
      location: 'Clínica VetCare',
      status: 'agendado'
    },
    {
      id: 2,
      petName: 'Luna',
      type: 'Vacinação',
      date: '2024-06-28',
      time: '10:00',
      location: 'Pet Shop Central',
      status: 'agendado'
    }
  ])

  const [reminders, setReminders] = useLocalStorage('petHealth_reminders', [
    {
      id: 1,
      petName: 'Rex',
      title: 'Vacina Antirrábica',
      description: 'Renovação da vacina antirrábica anual',
      dueDate: '2024-07-15',
      priority: 'alta',
      completed: false
    },
    {
      id: 2,
      petName: 'Luna',
      title: 'Vermifugação',
      description: 'Administrar vermífugo trimestral',
      dueDate: '2024-06-30',
      priority: 'média',
      completed: false
    },
    {
      id: 3,
      petName: 'Rex',
      title: 'Consulta de Rotina',
      description: 'Check-up semestral',
      dueDate: '2024-06-20',
      priority: 'baixa',
      completed: true
    }
  ])

  const [pets, setPets] = useLocalStorage('petHealth_pets', [
    {
      id: 1,
      name: 'Rex',
      species: 'Cão',
      breed: 'Golden Retriever',
      age: '3 anos',
      weight: '28kg',
      vaccines: [
        { id: 1, name: 'V10', date: '2024-01-15', nextDue: '2025-01-15' },
        { id: 2, name: 'Antirrábica', date: '2024-02-10', nextDue: '2025-02-10' }
      ],
      consultations: [
        { id: 1, date: '2024-05-20', reason: 'Check-up de rotina', vet: 'Dr. Silva', notes: 'Animal saudável, peso ideal' },
        { id: 2, date: '2024-03-15', reason: 'Vacinação', vet: 'Dra. Santos', notes: 'Aplicação da vacina V10' }
      ],
      medications: [
        { id: 1, name: 'Vermífugo', dosage: '1 comprimido', frequency: 'A cada 3 meses', lastGiven: '2024-04-01' }
      ]
    },
    {
      id: 2,
      name: 'Luna',
      species: 'Gato',
      breed: 'Siamês',
      age: '2 anos',
      weight: '4kg',
      vaccines: [
        { id: 1, name: 'Tríplice Felina', date: '2024-01-20', nextDue: '2025-01-20' }
      ],
      consultations: [
        { id: 1, date: '2024-04-10', reason: 'Consulta de rotina', vet: 'Dr. Costa', notes: 'Gata em ótimo estado de saúde' }
      ],
      medications: []
    }
  ])

  return {
    appointments,
    setAppointments,
    reminders,
    setReminders,
    pets,
    setPets
  }
}

