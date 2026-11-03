<!-- CatalogPage.vue — a lista com pesquisa, categoria e ordenação. Clicar num item navega. -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { search, byCategory, categories, sortByPrice } from '../catalog.js'
import { items, status, error, load, ensureLoaded } from '../store.js'
import ItemList from '../components/ItemList.vue'

const route = useRoute()
const router = useRouter()

onMounted(ensureLoaded)

// Bónus A: a pesquisa vive no URL (/?q=elden). replace e não push: cada tecla não fica no histórico.
const query = computed({
  get: () => route.query.q ?? '',
  set: (q) => router.replace({ query: q ? { q } : {} }),
})
const category = ref('')
const sortDir = ref('desc')

const visible = computed(() => {
  let list = search(items.value ?? [], query.value)
  if (category.value) list = byCategory(list, category.value)
  return sortByPrice(list, sortDir.value)
})
const cats = computed(() => categories(items.value ?? []))

function toggleSort() {
  sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
}
</script>

<template>
  <h1>Catálogo de jogos</h1>

  <div class="controls">
    <input v-model="query" type="search" placeholder="Pesquisar nome ou tag…">
    <button type="button" @click="query = ''">Limpar</button>
    <select v-model="category">
      <option value="">Todas as categorias</option>
      <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
    </select>
    <button type="button" @click="toggleSort">
      {{ sortDir === 'desc' ? 'Preço ↓' : 'Preço ↑' }}
    </button>
  </div>

  <p v-if="status === 'loading' || status === 'idle'">A carregar…</p>
  <p v-else-if="status === 'error'">
    Erro: {{ error }}
    <button type="button" @click="load">Tentar de novo</button>
  </p>
  <template v-else>
    <p>{{ visible.length }} de {{ items.length }} jogos</p>
    <ItemList :items="visible" @select="router.push({ name: 'item', params: { id: $event } })" />
  </template>
</template>

<style scoped>
h1 {
  color: #5b1f2e;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

input, select, button {
  font: inherit;
  padding: 6px 10px;
}
</style>
