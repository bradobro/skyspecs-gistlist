import express from "express"
import { api } from "../api/github.js"
import { db } from "../api/postgres.js"

const gist = express.Router()

gist.get("/list/:userID", (req, res) => {
  const { userID } = req.params

  api.getAllPublicByUserID(userID).then((data) => {
    const results = data.map(({ id, url, description, files, ...rest }) => {
      return {
        id,
        url,
        description,
        fileCount: Object.keys(files).length,
        details: { files, rest },
      }
    })

    res.json(results)
  })
})

gist.get("/:gistID", (req, res) => {
  const { gistID } = req.params
  api.getByID(gistID).then((data) => res.json(data))
})

gist.post("/:userID/favorite/:gistID", (req, res) => {
  const { userID, gistID } = req.params
  db.addFavorite(userID, gistID).then(() => res.sendStatus(201))
  // TODO: send 400 on duplicate key error
})

gist.delete("/:userID/favorite/:gistID", (req, res) => {
  const { gistID } = req.params
  db.removeFavorite(gistID).then(() => res.sendStatus(204))
})

gist.get("/:userID/favorites", (req, res) => {
  const { userID } = req.params

  db.getAllFavoritesForUser(userID).then((data) =>
    res.json(data.map((fave) => fave["gist_id"]))
  )
})

export default gist
