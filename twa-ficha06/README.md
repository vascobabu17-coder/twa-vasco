# Ficha 06 — Rotas e paginação

Catálogo de jogos da Ficha 05 com Vue Router, um store ao nível do módulo e uma lista paginada da PokéAPI.

## Como correr

```bash
npm install
npm run dev     # http://localhost:5173
node check.js   # em silêncio = tudo certo
```

## O que está feito

| Rota | Página | O quê |
|---|---|---|
| `/` | `pages/CatalogPage.vue` | lista com pesquisa, categoria e ordenação; clicar num jogo faz `router.push` para o detalhe |
| `/items/:id` | `pages/ItemPage.vue` | detalhe pelo id do URL; "não encontrado" para ids que não existem |
| `/items/new` | `pages/NewItemPage.vue` | o `ItemForm` da Ficha 05; ao guardar navega para `/items/<id novo>` |
| `/pokemon?page=N` | `pages/PokemonPage.vue` | PokéAPI paginada; a página vem de `route.query.page` e um `watch` recarrega |
| qualquer outra | `pages/NotFound.vue` | rota apanha-tudo (`/:pathMatch(.*)*`) |

- `store.js`: `items`, `status`, `error`, `load()`, `ensureLoaded()` e `addItem()`, partilhados por todas as páginas.
- `App.vue` só tem o `<nav>` com `<RouterLink>` e o `<RouterView />`.
- `ItemList`, `ItemDetail` e `ItemForm` não mudaram.
- Bónus A: a pesquisa vive no URL (`/?q=elden`) com `router.replace`.
- Bónus B: `/pokemon` é uma rota lazy (`() => import(...)`); o `npm run build` gera um chunk `PokemonPage-*.js` à parte.
- Nota: com `offset = (page - 1) * 20`, como no código da ficha, a página 2 começa em *spearow* e a página 3 em *zubat*.
- A Parte 4 (detalhe da entidade) é feita no repositório do grupo.

## Perguntas de reflexão

1. Com um `ref`, a página perdia-se num reload (voltava à 1), o botão back não mudava de página e não dava para enviar a alguém o link da página 3. No URL, o browser guarda-a no histórico e ela sobrevive ao reload.
2. O item ficou na lista porque o `store.js` é um módulo avaliado uma vez: navegar troca os componentes mas não o store. O reload recomeça a app do zero e volta a ler o `items.json`, que não tem o item. No M2 o `addItem` passa a fazer um POST à nossa API e o item fica guardado no MongoDB.
3. O `onMounted` só corre quando o componente é criado (ex.: de `/` para `/items/1`). De `/items/1` para `/items/2` a rota é a mesma e o Vue reutiliza o componente, por isso é preciso reagir à mudança do parâmetro: um `computed`/`watch` sobre `route.params` ou `route.query` (como o `watch(page, load)`).
4. Para o projeto, SPA: é uma aplicação com estado no browser, não precisa de SEO e serve-se como ficheiros estáticos. Para o site público da ISLA, SSG (ou SSR): o conteúdo muda pouco, a primeira pintura é rápida porque o HTML já vem feito e os motores de busca indexam-no; SSG só precisa de um servidor de ficheiros, SSR precisa de um servidor Node.

## Uso de IA

Feito em casa com a ajuda do Claude (Anthropic). Revi e percebo todo o código.
