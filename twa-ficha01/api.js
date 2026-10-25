// api.js — fetch de uma API pública e gravação dos campos em repo.json
import { writeFile } from 'fs/promises'

const res = await fetch(
  'https://api.github.com/repos/nodejs/node',
)
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const repo = await res.json()
console.log(repo.name, repo.stargazers_count)

// Guardar só os campos necessários
const dados = {
  name: repo.name,
  full_name: repo.full_name,
  description: repo.description,
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  language: repo.language,
  url: repo.html_url,
}
await writeFile('repo.json', JSON.stringify(dados, null, 2))
console.log('Gravado em repo.json')
