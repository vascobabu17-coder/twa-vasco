<!-- NewItemPage.vue — o ItemForm da Ficha 05; depois de guardar, navega para o item novo. -->
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { categories } from '../catalog.js'
import { items, ensureLoaded, addItem } from '../store.js'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()

onMounted(ensureLoaded)

const cats = computed(() => categories(items.value ?? []))

function onSave(item) {
  const id = addItem(item)
  router.push({ name: 'item', params: { id } })
}
</script>

<template>
  <p><RouterLink to="/">← Jogos</RouterLink></p>
  <p v-if="items === null">A carregar…</p>
  <ItemForm v-else :cats="cats" @save="onSave" />
</template>
