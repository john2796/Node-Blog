const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  getUserPosts,
  insert,
  update,
  remove
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserPosts(userId) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "p.text", "u.name as postedBy")
    .where("p.user_id", userId);
}

function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where("id", id)
    .del();
}
