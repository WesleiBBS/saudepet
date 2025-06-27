import { useState } from 'react'
import { FileText, Plus, Calendar, Syringe, Stethoscope, Pill, User } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'

export function ProntuarioScreen() {
  const [pets] = useState([
    {
      id: 1,
      name: 'Rex',
      species: 'Cão',
      breed: 'Golden Retriever',
      age: '3 anos',
      weight: '28kg',
      vaccines: [
        { name: 'V10', date: '2024-01-15', nextDue: '2025-01-15' },
        { name: 'Antirrábica', date: '2024-02-10', nextDue: '2025-02-10' }
      ],
      consultations: [
        { date: '2024-05-20', reason: 'Check-up de rotina', vet: 'Dr. Silva', notes: 'Animal saudável, peso ideal' },
        { date: '2024-03-15', reason: 'Vacinação', vet: 'Dra. Santos', notes: 'Aplicação da vacina V10' }
      ],
      medications: [
        { name: 'Vermífugo', dosage: '1 comprimido', frequency: 'A cada 3 meses', lastGiven: '2024-04-01' }
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
        { name: 'Tríplice Felina', date: '2024-01-20', nextDue: '2025-01-20' }
      ],
      consultations: [
        { date: '2024-04-10', reason: 'Consulta de rotina', vet: 'Dr. Costa', notes: 'Gata em ótimo estado de saúde' }
      ],
      medications: []
    }
  ])

  const [selectedPet, setSelectedPet] = useState(pets[0])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Prontuário Digital</h2>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Pet</span>
        </Button>
      </div>

      {/* Seletor de Pet */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {pets.map((pet) => (
          <Button
            key={pet.id}
            variant={selectedPet.id === pet.id ? "default" : "outline"}
            onClick={() => setSelectedPet(pet)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <User className="h-4 w-4" />
            <span>{pet.name}</span>
          </Button>
        ))}
      </div>

      {/* Informações do Pet Selecionado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{selectedPet.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Espécie:</span>
              <p>{selectedPet.species}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Raça:</span>
              <p>{selectedPet.breed}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Idade:</span>
              <p>{selectedPet.age}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Peso:</span>
              <p>{selectedPet.weight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs com Histórico */}
      <Tabs defaultValue="vaccines" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vaccines" className="flex items-center space-x-2">
            <Syringe className="h-4 w-4" />
            <span>Vacinas</span>
          </TabsTrigger>
          <TabsTrigger value="consultations" className="flex items-center space-x-2">
            <Stethoscope className="h-4 w-4" />
            <span>Consultas</span>
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center space-x-2">
            <Pill className="h-4 w-4" />
            <span>Medicamentos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vaccines" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Histórico de Vacinas</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Vacina
            </Button>
          </div>
          {selectedPet.vaccines.map((vaccine, index) => (
            <Card key={index}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{vaccine.name}</h4>
                    <p className="text-sm text-gray-600">
                      Aplicada em: {formatDate(vaccine.date)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Próxima dose: {formatDate(vaccine.nextDue)}
                    </p>
                  </div>
                  <Syringe className="h-5 w-5 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Histórico de Consultas</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Consulta
            </Button>
          </div>
          {selectedPet.consultations.map((consultation, index) => (
            <Card key={index}>
              <CardContent className="py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{consultation.reason}</h4>
                    <span className="text-sm text-gray-500">{formatDate(consultation.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600">Veterinário: {consultation.vet}</p>
                  <p className="text-sm">{consultation.notes}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Medicamentos</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Medicamento
            </Button>
          </div>
          {selectedPet.medications.length > 0 ? (
            selectedPet.medications.map((medication, index) => (
              <Card key={index}>
                <CardContent className="py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">{medication.name}</h4>
                    <p className="text-sm text-gray-600">Dosagem: {medication.dosage}</p>
                    <p className="text-sm text-gray-600">Frequência: {medication.frequency}</p>
                    <p className="text-sm text-gray-600">
                      Última administração: {formatDate(medication.lastGiven)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum medicamento registrado</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

