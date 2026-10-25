// check.js — uma asserção por função; não imprime nada se passar tudo
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  byCategory, search, total, top, categories, withDiscount, sortByPrice,
} from './src/catalog.js'

const items = JSON.parse(await readFile('./public/items.json', 'utf8'))

assert.deepEqual(byCategory(items, 'rpg').map(({ id }) => id), [1, 2])

assert.deepEqual(search(items, 'INDIE pixel').map(({ id }) => id), [6, 9])

assert.equal(total([{ price: 2 }, { price: 3.5 }]), 5.5)

assert.deepEqual(top(items, 2).map(({ id }) => id), [3, 2])

assert.deepEqual(categories(items),
  ['platformer', 'rpg', 'shooter', 'simulation', 'sports'])

const sample = [{ id: 1, price: 50 }]
assert.deepEqual(withDiscount(sample, 10), [{ id: 1, price: 45 }])
assert.equal(sample[0].price, 50) // original intacto

const prices = [{ price: 3 }, { price: 1 }, { price: 2 }]
assert.deepEqual(sortByPrice(prices, 'asc').map(({ price }) => price), [1, 2, 3])
assert.deepEqual(sortByPrice(prices, 'desc').map(({ price }) => price), [3, 2, 1])
assert.equal(prices[0].price, 3) // original intacto
