<!-- NotFound.vue — a rota apanha-tudo. -->
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>Página não encontrada</h1>
  <p>Não existe nada em <code>{{ route.fullPath }}</code>.</p>
  <p><RouterLink to="/">Voltar aos jogos</RouterLink></p>
</template>
