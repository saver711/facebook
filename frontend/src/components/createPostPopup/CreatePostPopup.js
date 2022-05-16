/////////// IMPORTS
///
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useClickOutside } from "../../helpers/clickOutside"
import { createPost } from "../../helpers/postFunction"
import { AddToYourPost } from "./AddToYourPost"
import classes from "./CreatePostPopup.module.css"
import { EmojiPickerBackground } from "./EmojiPickerBackground"
import { ImagePreview } from "./ImagePreview"
import PulseLoader from "react-spinners/PulseLoader"
import { PostError } from "./PostError"
import dataURItoBlob from "../../helpers/dataURItoBlob"
import { uploadImages } from "../../helpers/uploadImages"

///
/////////// HELPER FUNCTIONS
///

///
export const CreatePostPopup = ({ createPostVisibilityUpdater }) => {
  /////////// VARIABLES
  ///
  const postPopupRef = useRef()
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)
  useClickOutside(postPopupRef, () => createPostVisibilityUpdater(false))
  ///
  /////////// STATES
  ///
  const [text, textUpdater] = useState("")
  const [showPrev, showPrevUpdater] = useState(false)
  const [images, imagesUpdater] = useState([])
  const [background, backgroundUpdater] = useState("")
  const [loading, loadingUpdater] = useState(false)
  const [error, errorUpdater] = useState("")
  ///
  /////////// SIDE EFFECTS
  ///
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const addPostHandler = async () => {
    if (!images.length && !text) {
      errorUpdater("Write something first")
      return
    }

    if (background && text) {
      loadingUpdater(true)
      const response = await createPost(
        null,
        background,
        text,
        null,
        user?.id,
        user?.token
      )
      loadingUpdater(false)

      if (response !== "ok") {
        errorUpdater(response)
        return
      }
      backgroundUpdater("")
      textUpdater("")
      createPostVisibilityUpdater(false)
      return
    }

    if (!background && text && !images.length) {
      loadingUpdater(true)
      const response = await createPost(
        null,
        null,
        text,
        null,
        user?.id,
        user?.token
      )
      loadingUpdater(false)

      if (response !== "ok") {
        errorUpdater(response)
        return
      }
      textUpdater("")
      createPostVisibilityUpdater(false)
      return
    }

    if (images && images.length) {
      loadingUpdater(true)
      const postImages = images.map((img) => dataURItoBlob(img))
      const path = `${user?.username}/post_images`
      let formData = new FormData()
      formData.append("path", path)
      postImages.forEach((img) => formData.append("file", img))
      const response = await uploadImages(formData, path, user?.token)
      await createPost(null, null, text, response, user?.id, user?.token)
      loadingUpdater(false)
      if (!response) {
        errorUpdater("Something went wrong!")
        return
      }
      textUpdater("")
      imagesUpdater([])
      createPostVisibilityUpdater(false)
      return
    }
  }
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className="blur">
      <div className="postBox" ref={postPopupRef}>
        {error && <PostError error={error} errorUpdater={errorUpdater} />}
        <div className="box_header">
          <div className={`small_circle ${classes.createPostExitIcon}`}>
            <i
              className="exit_icon"
              onClick={() => createPostVisibilityUpdater(false)}
            ></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className={classes.box_profile}>
          <img
            className={classes.box_profile_img}
            src={user?.picture}
            alt="user picture"
          />
          <div className={classes.box_col}>
            <div className={classes.box_profile_name}>
              {user?.first_name} {user?.last_name}
            </div>
            <div className={classes.box_privacy}>
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {showPrev ? (
          <ImagePreview
            imagesUpdater={imagesUpdater}
            images={images}
            text={text}
            textUpdater={textUpdater}
            showPrevUpdater={showPrevUpdater}
            errorUpdater={errorUpdater}
          />
        ) : (
          <>
            <EmojiPickerBackground
              backgroundUpdater={backgroundUpdater}
              text={text}
              textUpdater={textUpdater}
            />
          </>
        )}
        <AddToYourPost
          showPrevUpdater={showPrevUpdater}
          backgroundUpdater={backgroundUpdater}
        />
        <button
          /* disabled={loading || !text} */
          className={classes.post_submit}
          onClick={addPostHandler}
        >
          {loading ? (
            <PulseLoader loading={loading} color="#fff" size={5} />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  )
}
