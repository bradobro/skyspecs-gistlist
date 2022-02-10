import express from 'express'
import { api } from "../api/index.js"

const gist = express.Router();

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

gist.post("/:userID/favorite/:gistID", (req, res) => {})

gist.get("/:userID/favorites", (req, res) => {})

export default gist