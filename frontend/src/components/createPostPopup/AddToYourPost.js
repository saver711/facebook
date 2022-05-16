/////////// IMPORTS
///
import { Dots, Feeling, Photo } from "../../svg"
import classes from "./CreatePostPopup.module.css"
///
/////////// HELPER FUNCTIONS
///

///
export const AddToYourPost = ({ showPrevUpdater, backgroundUpdater }) => {
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
  const showImagesPostHandler = () => {
    backgroundUpdater("")
    showPrevUpdater(true)
  }
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className={classes.addtoyourpost}>
      <p className={classes.addto_text}>Add to your post</p>
      <div className={classes.addtoyourpost_container}>
        <div
          className="hover1 post_header_right"
          onClick={showImagesPostHandler}
        >
          <Photo color="#45bd62" />
        </div>
        <div className="hover1 post_header_right">
          <i className="tag_icon"></i>
        </div>
        <div className="hover1 post_header_right">
          <Feeling color="#f7b928" />
        </div>
        <div className="hover1 post_header_right">
          <i className="maps_icon"></i>
        </div>
        <div className="hover1 post_header_right">
          <i className="microphone_icon"></i>
        </div>
        <div className="hover1 post_header_right">
          <Dots color="#65676b" />
        </div>
      </div>
    </div>
  )
}
