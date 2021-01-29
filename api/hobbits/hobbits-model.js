const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db('hobbits').where({id}).first();
}

async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit);
  return db('hobbits').where({ id }).first();
}

async function update(id, changes) {
  return db('hobbits').update(changes).where({ id })
}

async function remove(id) {
  const hobby = await db('hobbits').where({id}).first();
  db('hobbits').where({ id }).del();
  return hobby;
}
