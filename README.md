# TWA — Ficha 01

Tecnologias Web Avançadas · ISLA Gaia 2026/27

## twa-ficha01/
- `node app.js` — primeiro módulo ES (`utils.js` exporta `slug`) → `tecnologias-web-avançadas`
- `node api.js` — `fetch` à API do GitHub (`nodejs/node`) e grava os campos em `repo.json` com `fs/promises`
- `node rss.js` — extra: lê um feed RSS (XML) e imprime os três primeiros títulos

## twa-vite/
Projeto Vite (template vanilla). O contador conta para baixo e mostra o valor no título do separador.

```bash
cd twa-vite
npm install
npm run dev
```

## Requisitos
Node ≥ 22, npm ≥ 10.

## twa-ficha02/
Módulo de catálogo de **jogos**.
- `data.js` — 9 jogos (`id`, `name`, `category`, `price`, `tags`, `studio` aninhado)
- `catalog.js` — funções puras: `byCategory`, `search`, `total`, `top`, `categories`, `withDiscount` (+ extra `groupByCategory`; `search` aceita várias palavras)
- `app.js` — `node app.js` · `node app.js rpg` · `node app.js search indie` · `node app.js top 3` · `node app.js report` (escreve `report.json`)
- `check.js` — `node check.js` não imprime nada quando passa tudo

## twa-ficha03/
Catálogo no browser, sem framework (Vite vanilla).
- `src/catalog.js` da Ficha 02 + `sortByPrice(list, dir)`; dados em `public/items.json`
- `load()` com `fetch` + `res.ok` + `try`/`catch`/`finally` e três estados (loading · error · ready)
- um único `render()` com `createElement` + `textContent` — nunca `innerHTML` com dados
- eventos (pesquisa `input`, categoria `change`, ordenação `click`, detalhe ao clicar) só mudam o `state`
- bónus: delegação de eventos no `#list`, botão **Tentar de novo**
- `node check.js` (em silêncio) · `npm install && npm run dev`

## twa-ficha04/
O mesmo catálogo em Vue, num só `App.vue`.
- um `ref` por campo do estado, `load()` a escrever nos refs, sem `render()`
- `computed`: `visible`, `cats`, `selected`
- template: `v-model` na pesquisa e no select, `@click` na ordenação, `v-if`/`v-else-if`/`v-else`, `v-for` + `:key`, detalhe, `<style scoped>`
- bónus: contador "N de M" + botão **Limpar**
- nenhum `document.querySelector` · `node check.js` · `npm install && npm run dev`

## twa-ficha05/
Componentes e formulário (parte da Ficha 04).
- `components/ItemList.vue` (props `items`, `selectedId` + emit `select`), `ItemDetail.vue` (prop `item`)
- `components/ItemForm.vue`: rascunho `reactive`, `v-model.trim`/`.number`, `@submit.prevent`, `errors` + `isValid` como `computed`, `emit('save')` e reset
- `composables/useLoad.js` (com `onMounted`) + `api/getJSON.js`
- `watch(query)`: limpa a seleção e guarda a pesquisa em `localStorage` (bónus B)
- `node check.js` · `npm install && npm run dev`
- O passo 8 (repositório do grupo) é feito no repositório do projeto, não aqui.

## twa-ficha06/
Rotas e paginação: Vue Router (`/`, `/items/:id`, `/items/new`, `/pokemon?page=N`, 404), `store.js` partilhado e PokéAPI paginada. Ver `twa-ficha06/README.md` (inclui as respostas de reflexão).

## Uso de IA
Fichas 01 a 06 feitas com a ajuda do Claude (Anthropic), fora da aula. Revi e percebo todo o código.
