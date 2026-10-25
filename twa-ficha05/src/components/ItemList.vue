<!-- ItemList.vue — desenha qualquer array; reporta o clique, não decide -->
<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null },
})
const emit = defineEmits(['select'])
</script>

<template>
  <ul class="list">
    <li v-for="item in items" :key="item.id"
        :class="{ selected: item.id === selectedId }"
        @click="emit('select', item.id)">
      {{ item.name }} · {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>

<style scoped>
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
</style>
