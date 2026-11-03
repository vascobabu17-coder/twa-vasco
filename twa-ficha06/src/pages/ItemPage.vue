<!-- ItemPage.vue — o detalhe de /items/:id. O id vem do URL e é uma string ("3"). -->
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { items, status, ensureLoaded } from '../store.js'
import ItemDetail from '../components/ItemDetail.vue'

const route = useRoute()

// Num reload em /items/3 esta é a primeira página a montar — o store ainda está vazio.
onMounted(ensureLoaded)

const id = computed(() => Number(route.params.id))
const item = computed(() => (items.value ?? []).find((i) => i.id === id.value))
</script>

<template>
  <p><RouterLink to="/">← Jogos</RouterLink></p>
  <p v-if="status !== 'ready'">A carregar…</p>
  <p v-else-if="!item">Jogo {{ route.params.id }} não encontrado.</p>
  <ItemDetail v-else :item="item" />
</template>
