import React, { useState } from "react"
import { getListForUser } from "../services/api"
import GistItem from "./gistitem";

const GistList = () => {
  const [userID, setUserID] = useState(null)
  const [gists, setGists] = useState([])

  const listGists = () => {
    if (!userID) return

    getListForUser(userID).then((data) => setGists(data))
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
      <input type="text" onChange={(e) => setUserID(e.target.value)} />
      <button type="submit" onClick={listGists}>
        Go
      </button>
      {gists.map(({ id, url, description, fileCount }) => (
        <GistItem
          userID={userID}
          gistID={id}
          url={url}
          description={description}
          fileCount={fileCount}
          // TODO: favorited
        />
      ))}
    </div>
  )
}

GistList.propTypes = {}
export default GistList
