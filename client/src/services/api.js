import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3010"
})

export function getListForUser(userID) {
  return api.get(`/gist/list/${userID}`).then((response) => response.data)
}

export function getFavoritesForUser(userID) {
  return api.get(`/gist/${userID}/favorites`).then((response) => response.data)
}

export function addFavorite(userID, gistID) {
 return api.post(`/gist/${userID}/favorite/${gistID}`)
}

export function removeFavorite(userID, gistID) {
  return api.delete(`/gist/${userID}/favorite/${gistID}`)
}