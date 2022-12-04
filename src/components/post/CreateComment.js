import { forwardRef, useEffect, useRef, useState } from "react"
import Picker from "emoji-picker-react"
import classes from "./Post.module.css"
import { useSelector } from "react-redux"
import { useClickOutside } from "../../helpers/clickOutside"
import { HashLoader } from "react-spinners"
import { uploadImages } from "../../helpers/uploadImages"
import dataURItoBlob from "../../helpers/dataURItoBlob"
import { comment } from "../../helpers/postFunction"

export const CreateComment = forwardRef(({ postId, setComments, setCount }, ref) => {
  const [picker, setPicker] = useState(false)
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [commentImage, setCommentImage] = useState("")
  const [cursorPosition, setCursorPosition] = useState()
  const textRef = ref
  const imgInput = useRef(null)

  const commentEmojiRef = useRef(null)
  const user = useSelector((state) => state.userReducer.userData)

  useClickOutside(commentEmojiRef, () => setPicker(false))

  const [loading, loadingUpdater] = useState(false)

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition
  }, [cursorPosition])
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current
    ref.focus()
    const start = text.substring(0, ref.selectionStart)
    const end = text.substring(ref.selectionStart)
    const newText = start + emoji + end
    setText(newText)
    setCursorPosition(start.length + emoji.length)
  }
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
    } /* else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`)
      return
    } */

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      setCommentImage(event.target.result)
    }
  }

  const handelComment = async (e) => {
    e.preventDefault()
    loadingUpdater(true)

    let comments
    if (commentImage != "") {
      const img = dataURItoBlob(commentImage)
      const path = `${user?.username}/post_images/${postId}/comments`
      let formData = new FormData()
      formData.append("path", path)
      formData.append("file", img)
      const imgComment = await uploadImages(formData, path, user?.token)
      comments = await comment(postId, text, imgComment[0].url, user.token)
    } else {
      comments = await comment(postId, text, "", user.token)
    }
    setComments(comments)
    setCount((prev) => ++prev)
    loadingUpdater(false)
    textRef.current.blur()
    setText("")
    setCommentImage("")
  }
  return (
    <div className={classes.create_comment_wrap}>
      <div className={classes.create_comment}>
        <img src={user?.picture} alt="user pic" />
        <div className={classes.comment_input_wrap}>
          <form action="" onSubmit={handelComment}>
            <input
              type="file"
              hidden
              ref={imgInput}
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleImage}
            />

            <input
              type="text"
              ref={textRef}
              value={text}
              placeholder="Write a comment..."
              onChange={(e) => setText(e.target.value)}
            />
          </form>
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <div className={classes.commentLoader}>
            <HashLoader
              style={{ width: "20px" }}
              loading={loading}
              size={20}
              color="#1876f2"
            />
          </div>
          <div ref={commentEmojiRef}>
            <div
              className={`hover3 ${classes.comment_circle_icon}`}
              onClick={() => {
                setPicker((prev) => !prev)
              }}
            >
              <i className="emoji_icon invertToWhite"></i>
            </div>
            {picker && (
              <div className="comment_emoji_picker">
                <Picker onEmojiClick={handleEmoji} />
              </div>
            )}
          </div>

          <div
            className={`hover3 ${classes.comment_circle_icon}`}
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon invertToWhite"></i>
          </div>
          <div className={`hover3 ${classes.comment_circle_icon}`}>
            <i className="gif_icon invertToWhite"></i>
          </div>
          <div className={`hover3 ${classes.comment_circle_icon}`}>
            <i className="sticker_icon invertToWhite"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className={classes.comment_img_preview}>
          <img src={commentImage} alt="comment image" />
          <div
            className={`small_white_circle ${classes.comment_img_preview_close}`}
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon invertToWhite"></i>
          </div>
        </div>
      )}
    </div>
  )
})
