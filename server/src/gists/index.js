import axios from "axios"

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github.v3+json" },
})

function getAllPublicByUserID(userID) {
  return api.get(`/users/${userID}/gists`).then((response) => response.data)
  // TODO: Catch ( 404 )
}

function getByID(gistID) {
  return api.get(`/gists/${gistID}`).then((response) => response.data)
  // TODO: Catch ( 404 / 403 )
}

export const gists = {
  getAllPublicByUserID,
  getByID,
}
