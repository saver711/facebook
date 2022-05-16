import { useRef, useState } from "react"
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
                <i className="camera_filled_icon"></i>
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
            <div className={classes.profile_friend_count}></div>
            <div className={classes.profile_friend_imgs}></div>
          </div>
        </div>
        {visitor ? (
          ""
        ) : (
          <div className={classes.profile_w_right}>
            <div className="blue_btn btn">
              <img src="../../../icons/plus.png" alt="" className="invert" />
              <span>Add to story</span>
            </div>
            <div className="gray_btn btn">
              <i className="edit_icon"></i>
              <span>Edit profile</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
