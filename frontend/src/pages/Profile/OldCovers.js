import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useClickOutside } from "../../helpers/clickOutside"
import classes from "./Profile.module.css"

export default function OldCovers({ photos, setCoverPicture, setShow }) {
  const user = useSelector((state) => state.userReducer.userData)
  const Ref = useRef(null)

  const [whatToShow, whatToShowUpdater] = useState("cover")

  useClickOutside(Ref, () => setShow(false))

  return (
    <div className="blur">
      <div className={`postBox ${classes.selectCoverBox}`} ref={Ref}>
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setShow(false)
            }}
          >
            <i className="exit_icon invertToWhite"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className={classes.selectCoverBox_links}>
          <div
            onClick={() => whatToShowUpdater("cover")}
            className={`${classes.selectCoverBox_link} ${
              whatToShow === "cover" ? classes.active : ""
            }`}
          >
            Cover Photos
          </div>
          <div
            onClick={() => whatToShowUpdater("albums")}
            className={`${classes.selectCoverBox_link} ${
              whatToShow === "albums" ? classes.active : ""
            }`}
          >
            Photo Albums
          </div>
        </div>
        <div className={`scrollbar ${classes.old_pictures_wrap}`}>
          {whatToShow === "cover" ? (
            <div className={classes.old_pictures}>
              {photos &&
                photos
                  .filter(
                    (img) => img.folder === `${user?.username}/cover_pictures`
                  )
                  .map((photo) => (
                    <img
                      src={photo.secure_url}
                      key={photo.public_id}
                      alt=""
                      onClick={() => {
                        setCoverPicture(photo.secure_url)
                        setShow(false)
                      }}
                    />
                  ))}
            </div>
          ) : (
            <div>
              <h4>Posts images</h4>
              <div className={classes.old_pictures}>
                {photos &&
                  photos
                    .filter(
                      (img) => img.folder === `${user?.username}/post_images`
                    )
                    .map((photo) => (
                      <img
                        src={photo.secure_url}
                        key={photo.public_id}
                        alt=""
                        onClick={() => {
                          setCoverPicture(photo.secure_url)
                          setShow(false)
                        }}
                      />
                    ))}
              </div>

              <h4>Profile images</h4>
              <div className={classes.old_pictures}>
                {photos &&
                  photos
                    .filter(
                      (img) =>
                        img.folder === `${user?.username}/profile_pictures`
                    )
                    .map((photo) => (
                      <img
                        src={photo.secure_url}
                        key={photo.public_id}
                        alt=""
                        onClick={() => {
                          setCoverPicture(photo.secure_url)
                          setShow(false)
                        }}
                      />
                    ))}
              </div>

              <h4>Other images</h4>
              <div className={classes.old_pictures}>
                {photos &&
                  photos
                    .filter(
                      (img) =>
                        img.folder !== `${user?.username}/profile_pictures` &&
                        img.folder !== `${user?.username}/post_images` &&
                        img.folder !== `${user?.username}/cover_pictures`
                    )
                    .map((photo) => (
                      <img
                        src={photo.secure_url}
                        key={photo.public_id}
                        alt=""
                        onClick={() => {
                          setCoverPicture(photo.secure_url)
                          setShow(false)
                        }}
                      />
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
