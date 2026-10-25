// app.js — o único ficheiro que imprime
import { writeFile } from 'node:fs/promises'
import { items } from './data.js'
import { byCategory, search, top, total, categories } from './catalog.js'

const [cmd, ...args] = process.argv.slice(2)

const show = (list) =>
  list.forEach(({ id, name, category, price }) =>
    console.log(`${id} · ${name} · ${category} · ${price.toFixed(2)} €`))

if (!cmd) {
  show(items)
} else if (cmd === 'search') {
  show(search(items, args.join(' ')))
} else if (cmd === 'top') {
  show(top(items, Number(args[0] ?? 3)))
} else if (cmd === 'report') {
  const report = {
    count: items.length,
    total: Math.round(total(items) * 100) / 100,
    categories: categories(items),
    top3: top(items, 3).map(({ id, name, price }) => ({ id, name, price })),
  }
  await writeFile('report.json', JSON.stringify(report, null, 2))
  console.log('Relatório gravado em report.json')
} else {
  // qualquer outra palavra é tratada como categoria
  show(byCategory(items, cmd))
}
