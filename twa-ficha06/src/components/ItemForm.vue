<!-- ItemForm.vue — um rascunho, um submit, um emit -->
<script setup>
import { reactive, computed } from 'vue'

defineProps({ cats: { type: Array, required: true } })
const emit = defineEmits(['save'])

const empty = { name: '', category: '', price: null, tags: '' }
const form = reactive({ ...empty })

const errors = computed(() => {
  const e = {}
  if (form.name.length < 3) e.name = 'pelo menos 3 caracteres'
  if (!form.category) e.category = 'escolhe uma'
  if (!(form.price > 0)) e.price = 'tem de ser > 0'
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)

function save() {
  if (!isValid.value) return
  emit('save', {
    ...form,
    tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
  })
  Object.assign(form, empty) // limpa o rascunho
}
</script>

<template>
  <form class="form" @submit.prevent="save">
    <h2>Novo jogo</h2>
    <label>
      <input v-model.trim="form.name" placeholder="Nome" required>
      <small v-if="errors.name">{{ errors.name }}</small>
    </label>
    <label>
      <select v-model="form.category" required>
        <option value="" disabled>Categoria…</option>
        <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
      </select>
      <small v-if="errors.category">{{ errors.category }}</small>
    </label>
    <label>
      <input v-model.number="form.price" type="number" min="0" step="0.01"
             placeholder="Preço" required>
      <small v-if="errors.price">{{ errors.price }}</small>
    </label>
    <label>
      <input v-model.trim="form.tags" placeholder="tags, separadas por vírgulas">
    </label>
    <button :disabled="!isValid">Adicionar</button>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: 8px;
  max-width: 360px;
  margin-top: 24px;
}

label {
  display: grid;
  gap: 2px;
}

input, select, button {
  font: inherit;
  padding: 6px 10px;
}

small {
  color: #a3162f;
}
</style>
