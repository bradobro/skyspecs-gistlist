import axios from "axios"

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github.v3+json" },
})

function getAllPublicByUserID(userID) {
  return github.get(`/users/${userID}/gists`).then((response) => response.data)
  // TODO: Catch ( 404 )
}

function getByID(gistID) {
  return github.get(`/gists/${gistID}`).then((response) => response.data)
  // TODO: Catch ( 404 / 403 )
}

export const api = {
  getAllPublicByUserID,
  getByID,
}
