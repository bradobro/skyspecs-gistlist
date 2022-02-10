import pgPromise from "pg-promise"

// TODO: allow config via env vars
const DB_USER = "postgres"
const DB_PASS = "superSecretPassword"
const DB_HOST = "localhost"
const DB_PORT = "5432"
const CONFIG = {}

const pgp = pgPromise(CONFIG)(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/postgres`
)

function getAllFavoritesForUser(userID) {
  return pgp.any("SELECT gist_id FROM favorites WHERE user_id = $1", [userID])
  // TODO: Catch DB errors
}

function addFavorite(userID, gistID) {
  return pgp.none("INSERT INTO favorites(gist_id, user_id) VALUES ($1, $2)", [
    gistID,
    userID,
  ])
  // TODO: Catch Unique Key error, DB errors
}

function removeFavorite(gistID) {
  return pgp.result(
    "DELETE FROM favorites where gist_id = $1",
    [gistID],
    (res) => res.rowCount
  )
  // TODO: Catch DB errors
}

export const db = {
  getAllFavoritesForUser,
  addFavorite,
  removeFavorite,
}
