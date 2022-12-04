import { Link } from "react-router-dom"
import classes from "./Profile.module.css"

export default function Friends({ friends }) {
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
        Friends
        <Link to='/friends' className={classes.profile_header_link}>See all Friends</Link>
      </div>
      {friends && (
        <div className={classes.profile_card_count}>
          {friends?.length === 0
            ? "No friends"
            : friends?.length === 1
            ? "1 Friend"
            : `${friends?.length} Friends`}
        </div>
      )}
      <div className={classes.profile_card_grid}>
        {friends &&
          friends.slice(0, 9).map((friend, i) => (
            <Link to={`/profile/${friend.username}`} className={classes.profile_photo_card} key={i}>
              <img src={friend.picture} alt={`${friend.first_name}'s photo`} />
            </Link>
          ))}
      </div>
    </div>
  )
}
