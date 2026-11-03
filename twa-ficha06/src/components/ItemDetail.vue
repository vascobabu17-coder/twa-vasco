<!-- ItemDetail.vue — só lê a prop item -->
<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<template>
  <section class="detail">
    <h2>{{ item.name }}</h2>
    <p>Categoria: {{ item.category }}</p>
    <p>Preço: {{ item.price.toFixed(2) }} €</p>
    <ul v-if="item.tags.length" class="tags">
      <li v-for="tag in item.tags" :key="tag">{{ tag }}</li>
    </ul>
    <!-- os itens criados no formulário não têm estúdio -->
    <p v-if="item.studio">Estúdio: {{ item.studio.name }} ({{ item.studio.country }})</p>
  </section>
</template>

<style scoped>
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
