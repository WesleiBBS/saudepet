import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Download, X, Smartphone } from 'lucide-react'

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)
    
    // Verificar se já está instalado como PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                     window.navigator.standalone || 
                     document.referrer.includes('android-app://')
    setIsStandalone(standalone)

    // Event listener para prompt de instalação (Android/Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Mostrar prompt após 3 segundos
      setTimeout(() => {
        if (!standalone) {
          setShowPrompt(true)
        }
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Para iOS, mostrar prompt após 5 segundos se não estiver instalado
    if (iOS && !standalone) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        setShowPrompt(false)
      }
    }
  }

  const handleClose = () => {
    setShowPrompt(false)
    // Não mostrar novamente por 24 horas
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  // Não mostrar se já está instalado
  if (isStandalone) return null

  // Verificar se foi dispensado recentemente
  const lastDismissed = localStorage.getItem('pwa-prompt-dismissed')
  if (lastDismissed) {
    const dismissedTime = parseInt(lastDismissed)
    const oneDayInMs = 24 * 60 * 60 * 1000
    if (Date.now() - dismissedTime < oneDayInMs) {
      return null
    }
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-sm">
      <Card className="border-blue-200 bg-blue-50 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-sm text-blue-900">
                Instalar PetHealth
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0 text-blue-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-xs text-blue-700">
            {isIOS 
              ? "Adicione à tela inicial para acesso rápido"
              : "Instale o app para melhor experiência"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {isIOS ? (
            <div className="space-y-2">
              <p className="text-xs text-blue-800">
                1. Toque no botão <strong>Compartilhar</strong> ⬆️
              </p>
              <p className="text-xs text-blue-800">
                2. Selecione <strong>"Adicionar à Tela de Início"</strong>
              </p>
            </div>
          ) : (
            <Button
              onClick={handleInstall}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Instalar App
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
