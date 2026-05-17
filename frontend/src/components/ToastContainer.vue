<script setup>
import { useToast } from '../composables/useToast'
import { CheckCircle, XCircle, Info, X } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="toast-container">
    <TransitionGroup name="toast-list">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
        <div class="toast-icon">
          <CheckCircle v-if="toast.type === 'success'" :size="20" />
          <XCircle v-else-if="toast.type === 'error'" :size="20" />
          <Info v-else :size="20" />
        </div>
        <div class="toast-content">
          <p>{{ toast.message }}</p>
        </div>
        <button class="toast-close" @click="removeToast(toast.id)">
          <X :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 9999;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  color: var(--text-main);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  min-width: 300px;
  max-width: 400px;
  pointer-events: auto;
  border-left: 4px solid transparent;
}

.toast.success { border-left-color: #10b981; }
.toast.success .toast-icon { color: #10b981; }

.toast.error { border-left-color: #ef4444; }
.toast.error .toast-icon { color: #ef4444; }

.toast.info { border-left-color: #3b82f6; }
.toast.info .toast-icon { color: #3b82f6; }

.toast-content {
  flex: 1;
}

.toast-content p {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
}

.toast-close {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.toast-close:hover {
  background: rgba(255,255,255,0.1);
  color: var(--text-main);
}

.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.toast-list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

@media (max-width: 768px) {
  .toast-container {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }
  
  .toast {
    min-width: unset;
    width: 100%;
  }
}
</style>
