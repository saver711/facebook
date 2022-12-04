/////////// IMPORTS
///
import classes from "./CreatePostPopup.module.css"
///
/////////// HELPER FUNCTIONS
///

///
export const PostError = ({error, errorUpdater})=>{
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

///
/////////// FUNCTIONS
///

///
return (
  <div className="postError">
    <p className="postError_error">{error}</p>
    <button
      className="blue_btn btn"
      onClick={() => {
        errorUpdater("")
      }}
    >
      Try again
    </button>
  </div>
)
}