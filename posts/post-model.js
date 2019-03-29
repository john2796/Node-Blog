const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findAll
};

////localhost:4000/api/posts?limit=3&page=2&sortby=name&sortdir=desc
//then you would just pas etc.find(req.query)
function find(query) {
  const { page = 1, limit = 5, sortby = "id", sortdir = "asc" } = query;
  const offset = limit * (page - 1);
  console.log(offset);

  let rows = db("posts")
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);
  return rows;
  // return db("posts"); regular
}

function findAll() {
  return db("posts");
}

function findById(id) {
  return db("posts")
    .where({ id })
    .first();
}
function insert(post) {
  return db("posts")
    .insert(post)
    .then(ids => {
      return findById(ids[0]);
    });
}
function update(id, changes) {
  return db("posts")
    .where({ id })
    .update(changes);
}
function remove(id) {
  return db("posts")
    .where("id", id)
    .del();
}
