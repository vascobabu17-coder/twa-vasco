<script setup>
import { ref, computed } from 'vue'
import { search, byCategory, categories, sortByPrice } from './catalog.js'

// um ref por campo do state da Ficha 03
const status = ref('loading')
const error = ref(null)
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

// derivados: pesquisa → categoria → ordenação
const visible = computed(() => {
  let list = search(items.value, query.value)
  if (category.value) list = byCategory(list, category.value)
  return sortByPrice(list, sortDir.value)
})
const cats = computed(() => categories(items.value))
const selected = computed(() =>
  items.value.find(({ id }) => id === selectedId.value))

async function load() {
  status.value = 'loading'
  error.value = null
  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    items.value = await res.json()
    status.value = 'ready'
  } catch (err) {
    // rede, 404, ou o index.html do Vite (Unexpected token '<')
    status.value = 'error'
    error.value = err.message
  }
}

function toggleSort() {
  sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
}

load()
</script>

<template>
  <main>
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

    <p v-if="status === 'loading'">A carregar…</p>
    <p v-else-if="status === 'error'">
      Erro: {{ error }}
      <button type="button" @click="load">Tentar de novo</button>
    </p>
    <template v-else>
      <p>{{ visible.length }} de {{ items.length }} jogos</p>
      <ul class="list">
        <li v-for="item in visible" :key="item.id"
            :class="{ selected: item.id === selectedId }"
            @click="selectedId = item.id">
          {{ item.name }} · {{ item.price.toFixed(2) }} €
        </li>
      </ul>

      <section v-if="selected" class="detail">
        <h2>{{ selected.name }}</h2>
        <p>Categoria: {{ selected.category }}</p>
        <p>Preço: {{ selected.price.toFixed(2) }} €</p>
        <ul class="tags">
          <li v-for="tag in selected.tags" :key="tag">{{ tag }}</li>
        </ul>
        <p>Estúdio: {{ selected.studio.name }} ({{ selected.studio.country }})</p>
      </section>
    </template>
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
}

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

.list {
  list-style: none;
  padding: 0;
}

.list li {
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.list li:hover {
  background: #f1e8ea;
}

.list li.selected {
  background: #5b1f2e;
  color: white;
}

.detail {
  border-left: 4px solid #5b1f2e;
  padding-left: 16px;
}

.tags {
  display: flex;
  gap: 6px;
  list-style: none;
  padding: 0;
}

.tags li {
  background: #f1e8ea;
  border-radius: 4px;
  padding: 2px 8px;
}
</style>
