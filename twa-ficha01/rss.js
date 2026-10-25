// rss.js — extra "Acabaram cedo?": ler um feed RSS (XML) e imprimir os 3 primeiros títulos
const res = await fetch('https://news.ycombinator.com/rss')
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const xml = await res.text()

// O Node não tem DOMParser; para um feed simples chega uma expressão regular
const titulos = [...xml.matchAll(/<item>[\s\S]*?<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/g)]
  .map((m) => m[1].trim())
  .slice(0, 3)

titulos.forEach((t, i) => console.log(`${i + 1}. ${t}`))
