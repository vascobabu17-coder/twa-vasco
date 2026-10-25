// fetch + res.ok + parse — lança Error se o status não for 2xx
export async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`)
  return res.json()
}
