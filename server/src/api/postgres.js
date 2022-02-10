import pgPromise from "pg-promise"
import dotenv from 'dotenv'

dotenv.config()
const {
  POSTGRES_USER: DB_USER,
  POSTGRES_PASSWORD: DB_PASS,
  POSTGRES_HOST: DB_HOST,
  POSTGRES_PORT: DB_PORT,
  POSTGRES_DB: DB_NAME,
} = process.env
const CONFIG = {}

const pgp = pgPromise(CONFIG)(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
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
