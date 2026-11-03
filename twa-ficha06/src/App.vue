<!-- App.vue — só a moldura: navegação + o ecrã da rota atual. Sem estado, sem computed. -->
<template>
  <main>
    <nav class="nav">
      <RouterLink to="/">Jogos</RouterLink>
      <RouterLink to="/items/new">Novo jogo</RouterLink>
      <RouterLink to="/pokemon">Pokémon</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
}

.nav {
  display: flex;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}

.nav a {
  color: #5b1f2e;
  text-decoration: none;
  font-weight: 600;
}

/* /items/3 também marca "Jogos"? Não: o "/" só fica ativo na própria rota. */
.nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
