// check.js — uma asserção por função; não imprime nada se passar tudo
import assert from 'node:assert/strict'
import { items } from './data.js'
import {
  byCategory, search, total, top, categories, withDiscount, groupByCategory,
} from './catalog.js'

assert.deepEqual(byCategory(items, 'rpg').map(({ id }) => id), [1, 2])

assert.deepEqual(search(items, 'INDIE pixel').map(({ id }) => id), [6, 9])

assert.equal(total([{ price: 2 }, { price: 3.5 }]), 5.5)

assert.deepEqual(top(items, 2).map(({ id }) => id), [3, 2])

assert.deepEqual(categories(items),
  ['platformer', 'rpg', 'shooter', 'simulation', 'sports'])

const sample = [{ id: 1, price: 50 }]
assert.deepEqual(withDiscount(sample, 10), [{ id: 1, price: 45 }])
assert.equal(sample[0].price, 50) // original intacto

assert.equal(groupByCategory(items).shooter.length, 2)
