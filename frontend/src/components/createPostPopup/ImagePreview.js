/////////// IMPORTS
///
import { useRef } from "react"
import classes from "./CreatePostPopup.module.css"
import { EmojiPickerBackground } from "./EmojiPickerBackground"
///
/////////// HELPER FUNCTIONS
///

///
export const ImagePreview = ({
  text,
  textUpdater,
  imagesUpdater,
  images,
  showPrevUpdater,
  errorUpdater,
}) => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const handleImages = ({ target: { files } }) => {
    
    let cameFiles = Array.from(files)
    cameFiles.forEach((img) => {
      if (
        img.type !== "image/jpg" &&
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
        // img.type !== "video/mkv" &&
        // img.type !== "video/mp4" &&
        // img.type !== "video/mov" &&
        // img.type !== "video/flv" &&
        // img.type !== "video/avi" &&
        // img.type !== "video/webm"
      ) {
        cameFiles = cameFiles.filter(item => item.name !== img.name)
        errorUpdater("Not supported file")
        return
      }
      /*--- TAKE A LOOK HERE (vanilla js) ---*/
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = (event) => {
        imagesUpdater((images) => [...images, event.target.result])
      }
    })
    
  }

  const clearImagesHandler = () => {
    imagesUpdater([])
  }

  const goToNormalPostHandler = () => showPrevUpdater((prev) => !prev)
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className={`scrollbar ${classes.overflow_a}`}>
      <EmojiPickerBackground text={text} textUpdater={textUpdater} type2 />
      <div className={classes.add_pics_wrap}>
        {images && images.length ? (
          <div className={`${classes.add_pics_inside1} ${classes.p0}`}>
            <div className={classes.preview_actions}>
              <button className="hover1">
                <i className="edit_icon invertToWhite"></i>
                Edit
              </button>
              <label htmlFor="imagesInp2" className="hover1">
                <i
                  style={{ minWidth: "20px" }}
                  className="addPhoto_icon invertToWhite"
                ></i>
                <span>
                  Add Photos
                  <input
                    // accept="video/*,image/*"
                    // accept="image/jpg,image/jpeg,image/png,image,webp,image/gif,video/mkv,video/mp4,video/mov,video/flv,video/avi,video/webm"
                    accept="image/jpg,image/jpeg,image/png,image,webp,image/gif"
                    type="file"
                    multiple
                    id="imagesInp2"
                    onChange={handleImages}
                  />
                </span>
              </label>
            </div>
            <div className="small_white_circle" onClick={clearImagesHandler}>
              <i className="exit_icon invertToWhite"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? classes.preview1
                  : images.length === 2
                  ? classes.preview2
                  : images.length === 3
                  ? classes.preview3
                  : images.length === 4
                  ? classes.preview4
                  : images.length === 5
                  ? classes.preview5
                  : images.length % 2 === 0
                  ? classes.preview6
                  : classes.preview6 + " " + classes.singular_grid
              }
            >
              {images.map((img, i) => {
                // const [, type] = img.split(";")[0].split("/")
                // if (
                //   type === "jpg" ||
                //   type === "jpeg" ||
                //   type === "png" ||
                //   type === "webp" ||
                //   type === "gif"
                // ) return (
                return (
                  <img
                    className={classes.preview_elmnt}
                    src={img}
                    key={i}
                    alt={`img ${i}`}
                  />
                )
                // )

                // if (
                //   type === "mkv" ||
                //   type === "mp4" ||
                //   type === "mov" ||
                //   type === "flv" ||
                //   type === "avi" ||
                //   type === "webm"
                // ) return (
                //   <video
                //     key={i}
                //     controls
                //     className={classes.preview_elmnt}
                //     src={img}
                //   ></video>
                // )
              })}
            </div>
          </div>
        ) : (
          <div className={classes.add_pics_inside1}>
            <div className="small_white_circle" onClick={goToNormalPostHandler}>
              <i className="exit_icon invertToWhite"></i>
            </div>
            <label
              htmlFor="imagesId"
              className={`${classes.add_col} ${classes.bigLabel}`}
            >
              <input
                // accept="video/*,image/*"
                // accept="image/jpg,image/jpeg,image/png,image,webp,image/gif,video/mkv,video/mp4,video/mov,video/flv,video/avi,video/webm"
                accept="image/jpg,image/jpeg,image/png,image,webp,image/gif"
                type="file"
                multiple
                id="imagesId"
                onChange={handleImages}
              />
              <div className={classes.add_circle}>
                <i className="addPhoto_icon invertToWhite"></i>
              </div>
              <span>Add Photos</span>
              <span>or drag and drop</span>
            </label>
          </div>
        )}
        <div className={classes.add_pics_inside2}>
          <div className={classes.add_circle}>
            <i className="phone_icon invertToWhite"></i>
          </div>
          <p className={classes.mobile_text}>Add photos from your Phone.</p>
          <span className={classes.addphone_btn}>Add</span>
        </div>
      </div>
    </div>
  )
}
