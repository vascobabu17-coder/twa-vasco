// store.js — o estado dos itens vive aqui, fora de qualquer componente.
// Um módulo ES é avaliado uma vez e partilhado por quem o importa: estes refs são globais e reativos.
import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

export const items = ref(null) // null até o primeiro load resolver
export const status = ref('idle') // 'idle' | 'loading' | 'error' | 'ready'
export const error = ref(null)

export async function load() {
  status.value = 'loading'
  error.value = null
  try {
    items.value = await getJSON('/items.json')
    status.value = 'ready'
  } catch (err) {
    status.value = 'error'
    error.value = err.message
  }
}

// As páginas chamam isto ao montar: carrega UMA vez, seja qual for a página por onde se entra.
export function ensureLoaded() {
  if (items.value === null && status.value !== 'loading') load()
}

const nextId = () => Math.max(0, ...items.value.map((i) => i.id)) + 1

// O único sítio onde `items` muda.
export function addItem(item) {
  const id = nextId()
  items.value.push({ id, ...item })
  return id
}
