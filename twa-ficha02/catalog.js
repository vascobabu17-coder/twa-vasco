// catalog.js — só funções puras: sem console.log, sem for/while

// os itens dessa categoria
export const byCategory = (list, cat) =>
  list.filter(({ category }) => category === cat)

// os itens cujo nome ou tags contêm o texto (sem distinguir maiúsculas)
// com várias palavras, o item tem de conter todas
export const search = (list, text) => {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean)
  return list.filter(({ name, tags }) => {
    const haystack = [name, ...tags].map((s) => s.toLowerCase())
    return words.every((w) => haystack.some((s) => s.includes(w)))
  })
}

// a soma de price
export const total = (list) =>
  list.reduce((sum, { price }) => sum + price, 0)

// os n mais caros, array novo, ordenado desc.
export const top = (list, n) =>
  list.toSorted((a, b) => b.price - a.price).slice(0, n)

// os nomes das categorias, únicos, ordenados
export const categories = (list) =>
  [...new Set(list.map(({ category }) => category))].toSorted()

// itens novos com o preço reduzido pct % — os originais ficam intactos
export const withDiscount = (list, pct) =>
  list.map((item) => ({
    ...item,
    price: Math.round(item.price * (1 - pct / 100) * 100) / 100,
  }))

// extra: { categoria: [itens] } com Object.groupBy (ES2024)
export const groupByCategory = (list) =>
  Object.groupBy(list, ({ category }) => category)
