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
        <div className={classes.profile_header_link}>See all Friends</div>
      </div>
      {friends && (
        <div className={classes.profile_card_count}>
          {friends?.length === 0
            ? ""
            : friends?.length === 1
            ? "1 friend"
            : `${friends?.length} friends`}
        </div>
      )}
      <div className={classes.profile_card_grid}>
        {friends &&
          friends.slice(0, 9).map((friend) => (
            <div className={classes.profile_photo_card} key={friend.public_id}>
              {/* <img src={img.secure_url} alt="" /> */}
            </div>
          ))}
      </div>
    </div>
  )
}
