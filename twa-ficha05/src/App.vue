<script setup>
import { ref, computed, watch } from 'vue'
import { search, byCategory, categories, sortByPrice } from './catalog.js'
import { useLoad } from './composables/useLoad.js'
import { getJSON } from './api/getJSON.js'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'

// estado do carregamento — o onMounted vive dentro do composable
const { status, error, data: items, load } =
  useLoad(() => getJSON('/items.json'))

// estado da página (o App é o dono)
const query = ref(localStorage.getItem('query') ?? '')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)

// derivados: pesquisa → categoria → ordenação
const visible = computed(() => {
  let list = search(items.value ?? [], query.value)
  if (category.value) list = byCategory(list, category.value)
  return sortByPrice(list, sortDir.value)
})
const cats = computed(() => categories(items.value ?? []))
const selected = computed(() =>
  items.value?.find(({ id }) => id === selectedId.value))
const nextId = computed(() =>
  Math.max(0, ...(items.value ?? []).map((i) => i.id)) + 1)

// pesquisar limpa a seleção; e fica guardado para a próxima visita
watch(query, (q) => {
  selectedId.value = null
  localStorage.setItem('query', q)
})

function toggleSort() {
  sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc'
}

function addItem(item) {
  items.value.push({ id: nextId.value, ...item })
}
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
      <ItemList :items="visible" :selected-id="selectedId"
                @select="selectedId = $event" />
      <ItemDetail v-if="selected" :item="selected" />
      <ItemForm :cats="cats" @save="addItem" />
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
</style>
