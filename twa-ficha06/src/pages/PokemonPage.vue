<!-- PokemonPage.vue — lista paginada da PokéAPI. A página vive no URL (?page=3), não num ref. -->
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

// O URL é a fonte de verdade; ?page=abc ou ?page=0 contam como página 1.
const page = computed(() => Math.max(1, Math.trunc(Number(route.query.page)) || 1))

const { status, error, data, load } = useLoad(() => list(page.value))

// A rota é a mesma: o componente não volta a montar, é o watch que carrega as páginas 2, 3, …
// (o onMounted do useLoad fez o primeiro).
watch(page, load)

const pages = computed(() => Math.ceil((data.value?.count ?? 0) / PAGE))

function go(p) {
  router.push({ query: { page: p } })
}
</script>

<template>
  <h1>Pokémon</h1>

  <div class="pager">
    <button type="button" :disabled="page <= 1" @click="go(page - 1)">← Anterior</button>
    <span>Página {{ page }} de {{ pages || '…' }}</span>
    <button type="button" :disabled="page >= pages" @click="go(page + 1)">Seguinte →</button>
  </div>

  <p v-if="status === 'loading'">A carregar…</p>
  <p v-else-if="status === 'error'">
    Erro: {{ error }}
    <button type="button" @click="load">Tentar de novo</button>
  </p>
  <ol v-else-if="data" class="list" :start="(page - 1) * PAGE + 1">
    <li v-for="p in data.results" :key="p.name">{{ p.name }}</li>
  </ol>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  gap: 12px;
}

button {
  font: inherit;
  padding: 6px 10px;
}

.list li {
  padding: 4px 0;
  text-transform: capitalize;
}
</style>
