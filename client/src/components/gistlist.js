import React, { useState } from "react";
import { getListForUser } from "../services/api";


const Gistbox = () => {
  const [userID, setUserID] = useState(null)
  const [gists, setGists] = useState([])

  const listGists = () => {
    if (!userID) return

    getListForUser(userID).then(data => setGists(data))
  }

  const setFavorite = (userID, gistID, isFavorite) => {
    /* NYI:
      WHEN TRUE:
        call setFavorite from API
        update state with list of favorites
      WHEN FALSE:
        call removeFavorite from API
        update state
     */
  }

  /**
   * TODO:
   * Fetch a list of favorites for user in `listGists`, store in state
   * use favorites list as a "hash table" to see if a particular gist is favorited
   *
   * If favorited, change link to show "Remove from favorites" and toggle based on favorite status
   * (ideally, replace with full and empty heart emoji)
   *
   * TODO Reach:
   * Update display to a "table" display.
   * Add "Details" link to display remaining gist information
   *
   * Handle truncation in case of large files with "See More"
   */

  return (
    <div>
      <input type="text" onChange={e => setUserID(e.target.value)} />
      <button type="submit" onClick={listGists}>Go</button>
      { // TODO: move to separate component
        gists && gists.map(({ id: gistID, url, description, fileCount }) => {
        return (
          <div id={gistID}>
            <p><a href={url} target="_blank">{url}</a></p>
            <p>{description}</p>
            <p>Files: {fileCount}</p>
            <a onClick={setFavorite(userID, gistID, true)}>Favorite?</a>
          </div>
        )
      })
      }
    </div>
  )
}

export default Gistbox