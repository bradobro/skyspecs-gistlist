import express from "express"
import cors from "cors"
import { gists } from "./gists/index.js"

const app = express()
const PORT = 3010

app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to SkySpecs!")
})

app.get("/gist/list/:userID", (req, res) => {
  const { userID } = req.params

  gists.getAllPublicByUserID(userID).then((data) => {
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

app.get("/gist/:gistID", (req, res) => {
  const { gistID } = req.params
  gists.getByID(gistID).then((data) => res.json(data))
})

app.post("/gist/:userID/favorite/:gistID", (req, res) => {})

app.get("/gist/:userID/favorites", (req, res) => {})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
