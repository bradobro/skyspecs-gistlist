import express from "express"
import cors from "cors"
import routes from "./routes/index.js"
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.APP_PORT || 3010

app.use(cors())
app.use("/gist", routes.gist)

app.get("/", (req, res) => {
  res.send("Welcome to SkySpecs!")
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
