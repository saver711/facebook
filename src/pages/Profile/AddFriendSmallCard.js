import classes from "./Profile.module.css"
export default function AddFriendSmallCard({ item }) {
  return (
    <div className={classes.addFriendCard}>
      <div className={classes.addFriend_imgSmall}>
        <img src={item.profile_picture} alt="" />
        <div className={classes.addFriend_infos}>
          <div className={classes.addFriend_name} title={item.profile_name} >
            {item.profile_name.length > 11
              ? `${item.profile_name.substring(0, 11)}...`
              : item.profile_name}
          </div>
          <div
            className={`light_blue_btn btn ${classes.light_blue_btnFORadd}`}
          >
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className="filter_blue"
            />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  )
}
