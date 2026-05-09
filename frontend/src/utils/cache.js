export const cache = {
  get(key) {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    
    try {
      const parsed = JSON.parse(item);
      // Opcional: Verificar expiración si fuera necesario (ej: 1 hora)
      return parsed;
    } catch (e) {
      return null;
    }
  },
  
  set(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  
  clear() {
    sessionStorage.clear();
  }
};
