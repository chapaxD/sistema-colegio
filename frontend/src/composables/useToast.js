import { ref } from 'vue'

const toasts = ref([])
let count = 0

export const useToast = () => {
  const addToast = (message, type = 'success', duration = 3000) => {
    const id = count++
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  const success = (message, duration) => addToast(message, 'success', duration)
  const error = (message, duration) => addToast(message, 'error', duration)
  const info = (message, duration) => addToast(message, 'info', duration)

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  return { toasts, success, error, info, removeToast }
}
