import express from "express"
import cors from "cors"
import routes from "./routes/index.js"

const app = express()
const PORT = 3010

app.use(cors())
app.use("/gist", routes.gist)

app.get("/", (req, res) => {
  res.send("Welcome to SkySpecs!")
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
