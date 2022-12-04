/////////// IMPORTS
///
import classes from "./ProfilePicture.module.css"
import { useRef, useState } from "react"
import UpdateProfilePicture from "./UpdateProfilePicture"
import {useClickOutside} from "../../..//helpers/clickOutside"
import { photosReducer } from "../../../helpers/reducers"
import { useSelector } from "react-redux"
///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const ProfilePicture = ({ username, setShow, pRef, photos }) => {
  /////////// VARIABLES
  ///
  const popup = useRef(null)
  const refInput = useRef(null)
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)
  useClickOutside(popup, () => {
    setShow(false)
    setImage('')
  })
  ///
  /////////// STATES
  ///
  const [image, setImage] = useState("")
  const [error, setError] = useState("")
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const handleImage = (e) => {
    let file = e.target.files[0]
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`)
      return
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`)
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      setImage(event.target.result)
    }
  }

  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div
        className={`postBox ${classes.postBoxFORprofile} ${classes.pictureBox}`}
        ref={popup}
      >
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon invertToWhite"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className={classes.update_picture_wrap}>
          <div className={classes.update_picture_buttons}>
            <button
              className="light_blue_btn btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className={`scrollbar ${classes.old_pictures_wrap}`}>
          <h4>Your profile pictures</h4>
          <div className={classes.old_pictures}>
            {photos
              ?.filter(
                (img) => img.folder === `${user?.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>Other pictures</h4>
          <div className={classes.old_pictures}>
            {photos
              ?.filter(
                (img) => img.folder !== `${user?.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
        {image && (
          <UpdateProfilePicture
            setImage={setImage}
            image={image}
            setShow={setShow}
            setError={setError}
            pRef={pRef}
          />
        )}
      </div>
    </div>
  )
}
