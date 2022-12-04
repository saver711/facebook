/////////// IMPORTS
///
import classes from "./CreatePostPopup.module.css"
import { useEffect, useState, useRef } from "react"
import Picker from "emoji-picker-react"
import { useSelector } from "react-redux"
import { useClickOutside } from "../../helpers/clickOutside"

///
/////////// HELPER FUNCTIONS
///

///
export const EmojiPickerBackground = ({
  text,
  textUpdater,
  type2,
  backgroundUpdater,
}) => {
  /////////// VARIABLES
  ///
  const textAreaRef = useRef()
  const pickerRef = useRef()

  const postBackgrounds = [
    "../../../images/postBackgrounds/1.jpg",
    "../../../images/postBackgrounds/2.jpg",
    "../../../images/postBackgrounds/3.jpg",
    "../../../images/postBackgrounds/4.jpg",
    "../../../images/postBackgrounds/5.jpg",
    "../../../images/postBackgrounds/6.jpg",
    "../../../images/postBackgrounds/7.jpg",
    "../../../images/postBackgrounds/8.jpg",
    "../../../images/postBackgrounds/9.jpg",
  ]

  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)

  useClickOutside(pickerRef, () => pickerUpdater(false))
  ///
  /////////// STATES
  ///
  const [picker, pickerUpdater] = useState(false)
  const [cursorPosition, cursorPositionUpdater] = useState(null)
  const [showBgs, showBgsUpdater] = useState(false)
  const [bgState, bgStateUpdater] = useState(null)
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    textAreaRef.current.selectionEnd = cursorPosition
  }, [cursorPosition])
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  /* DESTRUCTING NESTED OBJ */
  const textValueUpdater = ({ target: { value } }) => textUpdater(value)

  const togglePicker = () => pickerUpdater((picker) => !picker)

  const handleEmoji = (e, { emoji }) => {
    const myRef = textAreaRef.current
    // myRef.focus()
    /*--- TAKE A LOOK HERE ---*/
    const start = text.substring(0, myRef.selectionStart)
    const end = text.substring(myRef.selectionStart)
    const newText = start + emoji + end
    textUpdater(newText)
    cursorPositionUpdater(start.length + emoji.length)
  }

  const toggleBgs = () => showBgsUpdater((prev) => !prev)

  const backgroundHandler = (i) => {
    backgroundUpdater(postBackgrounds[i])
    bgStateUpdater(`url(${postBackgrounds[i]})`)
  }

  const removeBgHandler = () => {
    backgroundUpdater('')
    bgState && bgStateUpdater(null)
  }
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className={type2 ? classes.images_input : ""}>
      <div
        style={{ background: bgState, width: "100%" }}
        className={`${type2 ? "" : classes.flex_center} ${
          bgState ? classes.bgHandler : ""
        }`}
      >
        <textarea
          // autoFocus
          ref={textAreaRef}
          maxLength="400"
          placeholder={`What is on your mind, ${user?.first_name}`}
          onChange={textValueUpdater}
          value={text}
          style={{
            paddingTop: `${
              bgState
                ? Math.abs(textAreaRef.current.value.length * 0.1 - 32)
                : "0"
            }%`,
            color: bgState ? "#000" : "",
          }}
          className={`scrollbar ${classes.post_input} ${
            type2 ? classes.input2 : ""
          }`}
        ></textarea>
      </div>
      <div className={type2 ? "" : classes.post_emojis_wrap}>
        {!type2 && (
          <img
            onClick={() => {
              toggleBgs()
              removeBgHandler()
            }}
            src="../../../icons/colorful.png"
            alt=""
          />
        )}

        {!type2 && showBgs && (
          <div className={classes.post_backgrounds}>
            <div onClick={removeBgHandler} className={classes.no_bg}></div>
            {postBackgrounds.map((bg, i) => (
              <img
                onClick={() => backgroundHandler(i)}
                src={bg}
                alt={`post back ${i}`}
                key={i}
              />
            ))}
          </div>
        )}

        <div ref={pickerRef}>
          {picker && (
            <div
              className={`comment_emoji_picker ${
                type2 ? classes.movepicker2 : classes.rlmove
              }`}
            >
              <Picker disableAutoFocus onEmojiClick={handleEmoji} />
            </div>
          )}

          <i
            onClick={togglePicker}
            className={`emoji_icon_large ${type2 ? classes.moveleft : ""}`}
          ></i>
        </div>
      </div>
    </div>
  )
}
