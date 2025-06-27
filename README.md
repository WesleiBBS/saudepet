# PetHealth - Aplicativo de Saúde Pet

Um aplicativo PWA (Progressive Web App) para acompanhar a saúde do seu pet com funcionalidades de agenda, lembretes e prontuário digital.

## 🐾 Funcionalidades

### 📅 Agenda
- Agendar consultas veterinárias
- Visualizar compromissos futuros
- Gerenciar diferentes tipos de consultas (veterinária, vacinação, cirurgia, exame, emergência)

### 🔔 Lembretes
- Criar lembretes para cuidados do pet
- Definir prioridades (alta, média, baixa)
- Marcar lembretes como concluídos
- Visualizar lembretes atrasados e próximos

### 📋 Prontuário Digital
- Gerenciar múltiplos pets
- Histórico de vacinas com datas de renovação
- Registro de consultas com observações
- Controle de medicamentos e dosagens

## 🚀 Tecnologias Utilizadas

- **React** - Framework JavaScript
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **PWA** - Progressive Web App
- **Service Worker** - Cache offline
- **LocalStorage** - Persistência de dados

## 📱 Instalação como PWA

1. Acesse o aplicativo no navegador
2. No Chrome/Edge: Clique no ícone de instalação na barra de endereços
3. No Safari (iOS): Toque em "Compartilhar" > "Adicionar à Tela de Início"
4. No Android: Toque no menu > "Adicionar à tela inicial"

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou pnpm

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd pet-health-app

# Instale as dependências
npm install
# ou
pnpm install
```

### Executar em desenvolvimento
```bash
npm run dev
# ou
pnpm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### Build para produção
```bash
npm run build
# ou
pnpm run build
```

## 📂 Estrutura do Projeto

```
pet-health-app/
├── public/
│   ├── manifest.json          # Manifest PWA
│   ├── sw.js                  # Service Worker
│   ├── icon-192.png          # Ícone PWA 192x192
│   └── icon-512.png          # Ícone PWA 512x512
├── src/
│   ├── components/
│   │   ├── Navigation.jsx     # Navegação principal
│   │   ├── AgendaScreen.jsx   # Tela de agenda
│   │   ├── LembretesScreen.jsx # Tela de lembretes
│   │   ├── ProntuarioScreen.jsx # Tela de prontuário
│   │   ├── AddAppointmentModal.jsx # Modal para nova consulta
│   │   └── AddReminderModal.jsx # Modal para novo lembrete
│   ├── hooks/
│   │   └── useLocalStorage.js # Hook para persistência
│   ├── App.jsx               # Componente principal
│   └── main.jsx              # Ponto de entrada
└── index.html                # HTML principal
```

## 💾 Persistência de Dados

Os dados são armazenados localmente no navegador usando LocalStorage, incluindo:
- Lista de consultas agendadas
- Lembretes criados
- Informações dos pets e histórico médico

## 🎨 Design

O aplicativo utiliza um design moderno e responsivo com:
- Esquema de cores azul e branco
- Interface intuitiva e amigável
- Compatibilidade com dispositivos móveis e desktop
- Ícones expressivos para melhor usabilidade

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ para o cuidado dos nossos pets 🐕🐱

