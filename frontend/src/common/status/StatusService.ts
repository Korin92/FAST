// Definimos el tipo Status
interface Status {
  variant: 'success' | 'error' | 'warning'
  message?: string
  error?: Error
}

// Creamos un objeto para almacenar los eventos
const events: Record<string, Array<(data: Status) => void>> = {}

// Definimos la función para suscribirse a un evento
const subscribe = (event: string, callback: (data: Status) => void): void => {
  if (!events[event]) {
    events[event] = []
  }
  events[event].push(callback)
}

// Definimos la función para publicar un evento
const publish = (event: string, data: Status): void => {
  if (events[event]) {
    events[event].forEach((callback) => {
      callback(data)
    })
  }
}

// Definimos la función para enviar el estado
export const sendStatus = (sts: Status): void => {
  publish('statusChange', sts)
}

// Definimos la función para observar el estado
export const statusObservable = (callback: (data: Status) => void): void => {
  subscribe('statusChange', callback)
}
