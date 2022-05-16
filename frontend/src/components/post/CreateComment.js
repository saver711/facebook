import { useEffect, useRef, useState } from "react"
import Picker from "emoji-picker-react"
import classes from "./Post.module.css"
import { useSelector } from "react-redux"
import {useClickOutside} from '../../helpers/clickOutside'

export default function CreateComment() {
  const [picker, setPicker] = useState(false)
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const [commentImage, setCommentImage] = useState("")
  const [cursorPosition, setCursorPosition] = useState()
  const textRef = useRef(null)
  const imgInput = useRef(null)

  const commentEmojiRef = useRef(null)
  const user = useSelector((state) => state.userReducer.userData)

  useClickOutside(commentEmojiRef, () => setPicker(false))

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
  return (
    <div className={classes.create_comment_wrap}>
      <div className={classes.create_comment}>
        <img src={user?.picture} alt="user pic" />
        <div className={classes.comment_input_wrap}>
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className={`hover2 ${classes.comment_circle_icon}`}
            ref={commentEmojiRef}
            onClick={() => {
              setPicker((prev) => !prev)
            }}
          >
              {picker && (
                <div className="comment_emoji_picker">
                  <Picker onEmojiClick={handleEmoji} />
                </div>
              )}
              <i className="emoji_icon"></i>
          </div>
          <div
            className={`hover2 ${classes.comment_circle_icon}`}
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className={`hover2 ${classes.comment_circle_icon}`}>
            <i className="gif_icon"></i>
          </div>
          <div className={`hover2 ${classes.comment_circle_icon}`}>
            <i className="sticker_icon"></i>
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
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  )
}
