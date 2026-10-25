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

## Uso de IA
Fichas 01 e 02 feitas com a ajuda do Claude (Anthropic), fora da aula. Revi e percebo todo o código.
