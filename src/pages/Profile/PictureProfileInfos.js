import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import Friendship from "./Friendship"
import { ProfilePicture } from "./profile picture/ProfilePicture"
// import ProfilePicture from "../../components/profilePicture"
import classes from "./Profile.module.css"
export default function ProfilePictureInfos({
  profile,
  visitor,
  photos,
  otherName,
}) {
  const [show, setShow] = useState(false)
  const pRef = useRef(null)
  return (
    <>
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className={classes.profile_img_wrap}>
        <div className={classes.profile_w_left}>
          <div className={classes.profile_w_img}>
            <div
              className={classes.profile_w_bg}
              ref={pRef}
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${profile?.picture})`,
              }}
            ></div>
            {!visitor && (
              <div
                className={`hover1 ${classes.profile_circle}`}
                onClick={() => setShow(true)}
              >
                <i className="camera_filled_icon invertToWhite"></i>
              </div>
            )}
          </div>
          <div className={classes.profile_w_col}>
            <div className={classes.profile_name}>
              {profile?.first_name} {profile?.last_name}
            </div>
            <div className={classes.otherName}>
              {otherName && `${otherName.trim()}`}
            </div>
            <div className={classes.profile_friend_count}>
              {profile?.friends && (
                <div className={classes.profile_card_count}>
                  {profile?.friends?.length === 0
                    ? ""
                    : profile?.friends?.length === 1
                    ? "1 Friend"
                    : `${profile?.friends?.length} Friends`}
                </div>
              )}
            </div>
            <div className={classes.profile_friend_imgs}>
              {profile?.friends?.slice(0, 6).map((friend, i) => (
                <Link key={i} to={`/profile/${friend.username}`}>
                  <img
                    src={friend.picture}
                    alt={`${friend.first_name}'s photo`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {visitor ? (
          <Friendship
            friendshipp={profile?.friendship}
            profileid={profile?._id}
          />
        ) : (
          <div className={classes.profile_w_right}>
            <div className="blue_btn btn">
              <img src="../../../icons/plus.png" alt="" className="invert" />
              <span>Add to story</span>
            </div>
            <div className="gray_btn btn">
              <i className="edit_icon"></i>
              <span className="whiteColor">Edit profile</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
