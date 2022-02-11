import React, { useState } from "react"
import PropTypes from "prop-types"
import { addFavorite, removeFavorite } from "../services/api"

const GistItem = ({
  userID,
  gistID,
  url,
  description,
  fileCount,
  favorited = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(favorited)

  const setFavorite = (gistID) => {
    const promise = isFavorite
      ? addFavorite(userID, gistID)
      : removeFavorite(userID, gistID)

    promise.then(() => setIsFavorite(!isFavorite))
  }

  return (
    <div id={gistID}>
      <p>
        <a href={url} target="_blank">
          {url}
        </a>
      </p>
      <p>{description}</p>
      <p>Files: {fileCount}</p>
      <a onClick={setFavorite}>{!isFavorite ? "Favorite" : "Unfavorite"}</a>
    </div>
  )
}

GistItem.propTypes = {
  userID: PropTypes.string.isRequired,
  gistID: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  fileCount: PropTypes.number,
  favorited: PropTypes.bool,
}
export default GistItem
