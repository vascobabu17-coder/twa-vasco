import './style.css'
import { search, byCategory, categories, sortByPrice } from './catalog.js'

const q = document.querySelector('#q')
const cat = document.querySelector('#cat')
const sortBtn = document.querySelector('#sort')
const status = document.querySelector('#status')
const list = document.querySelector('#list')
const detail = document.querySelector('#detail')

const state = {
  status: 'loading', error: null, items: [],
  query: '', category: '', sortDir: 'desc',
  selectedId: null,
}

// cria um elemento com texto — nunca innerHTML com dados
const el = (tag, text = '') => {
  const node = document.createElement(tag)
  node.textContent = text
  return node
}

const visibleItems = () => {
  let items = search(state.items, state.query)
  if (state.category) items = byCategory(items, state.category)
  return sortByPrice(items, state.sortDir)
}

const toLi = ({ id, name, price }) => {
  const li = el('li', `${name} · ${price.toFixed(2)} €`)
  li.dataset.id = id
  li.classList.toggle('selected', id === state.selectedId)
  return li
}

const toDetail = ({ name, category, price, tags, studio }) => {
  const tagList = el('ul')
  tagList.classList.add('tags')
  tagList.append(...tags.map((t) => el('li', t)))
  return [
    el('h2', name),
    el('p', `Categoria: ${category}`),
    el('p', `Preço: ${price.toFixed(2)} €`),
    tagList,
    el('p', `Estúdio: ${studio.name} (${studio.country})`),
  ]
}

// o único sítio que escreve no DOM
function render() {
  sortBtn.textContent = state.sortDir === 'desc' ? 'Preço ↓' : 'Preço ↑'

  if (state.status === 'loading') {
    status.replaceChildren(el('span', 'A carregar…'))
  } else if (state.status === 'error') {
    const retry = el('button', 'Tentar de novo')
    retry.type = 'button'
    retry.addEventListener('click', load)
    status.replaceChildren(el('span', `Erro: ${state.error} `), retry)
  } else {
    const n = visibleItems().length
    status.replaceChildren(el('span', n ? `${n} jogos` : 'Sem resultados'))
  }

  const current = cat.value
  cat.replaceChildren(
    new Option('Todas as categorias', ''),
    ...categories(state.items).map((c) => new Option(c, c)),
  )
  cat.value = current

  list.replaceChildren(...(state.status === 'ready' ? visibleItems().map(toLi) : []))

  const selected = state.items.find(({ id }) => id === state.selectedId)
  detail.replaceChildren(...(selected ? toDetail(selected) : []))
}

async function load() {
  state.status = 'loading'
  state.error = null
  render()
  try {
    const res = await fetch('/items.json')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    state.items = await res.json()
    state.status = 'ready'
  } catch (err) {
    // rede, 404, ou o index.html do Vite (Unexpected token '<')
    state.status = 'error'
    state.error = err.message
  } finally {
    render()
  }
}

// os eventos só mudam o state, depois render()
q.addEventListener('input', (e) => {
  state.query = e.target.value
  render()
})

cat.addEventListener('change', (e) => {
  state.category = e.target.value
  render()
})

sortBtn.addEventListener('click', () => {
  state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc'
  render()
})

// delegação: um só listener no #list
list.addEventListener('click', (e) => {
  const li = e.target.closest('li[data-id]')
  if (!li) return
  state.selectedId = Number(li.dataset.id)
  render()
})

load()
