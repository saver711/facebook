import classes from "./Profile.module.css"

import axios from "axios"
import { useEffect, useReducer } from "react"
import { photosCases, photosReducer } from "../../helpers/reducers"
import PulseLoader from "react-spinners/PulseLoader"

export default function Photos({ photos, loading }) {
  ///
  ////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///

  ///

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className={classes.profile_header_link}>See all photos</div>
      </div>
      <div className={classes.profile_card_count}>
        {loading ? (
          <PulseLoader color={`var(--color-secondary)`} size={5} />
        ) : photos?.total_count === 1 ? (
          "1 Photo"
        ) : photos?.total_count > 1 ? (
          `${photos?.total_count} photos`
        ) : (
          "No photos here."
        )}
      </div>
      <div className={classes.profile_card_grid}>
        {photos?.resources &&
          photos?.resources.slice(0, 9).map((img) => (
            <div className={classes.profile_photo_card} key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  )
}
