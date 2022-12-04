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
import { postCases, profileCases } from "../../helpers/reducers"

///
/////////// HELPER FUNCTIONS
///

///
export const CreatePostPopup = ({
  createPostVisibilityUpdater,
  postsDispatcher,
  posts,
  profile,
}) => {
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
    errorUpdater('')
    
    if (!images.length && !text) {
      errorUpdater("Write something first")
      return
    }

    //background post
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

      if (response.status !== "ok") {
        errorUpdater(response)
        loadingUpdater(false)
        return
      }
      postsDispatcher({
        type: profile ? profileCases.PROFILE_POSTS : postCases.POST_SUCCESS,
        payload: [response.data, ...posts],
      })
      loadingUpdater(false)
      backgroundUpdater("")
      textUpdater("")
      createPostVisibilityUpdater(false)
      return
    }

    // just text post
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
      if (response.status !== "ok") {
        errorUpdater(response)
        loadingUpdater(false)
        return
      }

      postsDispatcher({
        type: profile ? profileCases.PROFILE_POSTS : postCases.POST_SUCCESS,
        payload: [response.data, ...posts],
      })
      loadingUpdater(false)

      textUpdater("")
      createPostVisibilityUpdater(false)
      return
    }

    //images
    if (images && images.length) {
      loadingUpdater(true)

      const postImages = images.map((img) => dataURItoBlob(img))
      const path = `${user?.username}/post_images`
      let formData = new FormData()
      formData.append("path", path)
      postImages.forEach((img) => formData.append("file", img))
      const response = await uploadImages(formData, path, user?.token)

      if (!response) {
        errorUpdater("Something went wrong!")
        loadingUpdater(false)
        return
      }
      const bigResponse = await createPost(null, null, text, response, user?.id, user?.token)

      if (!bigResponse) {
        errorUpdater("Something went wrong!")
        loadingUpdater(false)
        return
      }

      postsDispatcher({
        type: profile ? profileCases.PROFILE_POSTS : postCases.POST_SUCCESS,
        payload: [bigResponse.data, ...posts],
      })
      loadingUpdater(false)
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
      <div className="postBox controlHeight" ref={postPopupRef}>
        {error && <PostError error={error} errorUpdater={errorUpdater} />}
        <div className="box_header">
          <div className={`small_circle ${classes.createPostExitIcon}`}>
            <i
              className="exit_icon invertToWhite"
              onClick={() => createPostVisibilityUpdater(false)}
            ></i>
          </div>
          <span style={{color: 'var(--color-primary)'}}>Create Post</span>
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
              <img className="invertToWhite" src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon invertToWhite"></i>
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
