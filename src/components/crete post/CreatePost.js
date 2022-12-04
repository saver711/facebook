/////////// IMPORTS
///
import classes from './CreatePost.module.css'
import { Feeling, LiveVideo, Photo } from "../../svg";
import UserMenu from "../header/userMenu/UserMenu";
import { useSelector } from 'react-redux';
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const CreatePost = ({ createPostVisibilityUpdater, profile }) => {
  /////////// VARIABLES
  ///
  const user = useSelector((state) => state.userReducer.userData)
  ///
  /////////// STATES
  ///

  ///
  /////////// CUSTOM HOOKS
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
const openPostPopup = () => createPostVisibilityUpdater(true)
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className="createPost" onClick={openPostPopup}>
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className={`hover2 ${classes.open_post}`}>
          What's on your mind, {user?.first_name}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className={`hover1 ${classes.createPost_icon}`}>
          <LiveVideo color="#f3425f" />
          Live video
        </div>
        <div className={`hover1 ${classes.createPost_icon}`}>
          <Photo color="#4bbf67" />
          Photos
        </div>
        {profile ? (
          <div className={`hover1 ${classes.createPost_icon}`}>
            <i className="lifeEvent_icon"></i>
            Live event
          </div>
        ) : (
          <div className={`hover1 ${classes.createPost_icon}`}>
            <Feeling color="#f7b928" />
            Feeling/activity
          </div>
        )}
      </div>
    </div>
  )
}