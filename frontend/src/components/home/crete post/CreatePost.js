/////////// IMPORTS
///
import classes from './CreatePost.module.css'
import { Feeling, LiveVideo, Photo } from "../../../svg";
import UserMenu from "../../header/userMenu/UserMenu";
import { useSelector } from 'react-redux';
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const CreatePost = () =>{
/////////// VARIABLES
///
const user = useSelector((state) => state.userReducer.userData);
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

///
/////////// FUNCTIONS
///

///
return <div className={classes.createPost}>
<div className={classes.createPost_header}>
  <img src={user?.picture} alt="" />
  <div className={`hover2 ${classes.open_post}`}>
    What's on your mind, {user?.first_name}
  </div>
</div>
<div className={classes.create_splitter}></div>
<div className={classes.createPost_body}>
  <div className={`hover1 ${classes.createPost_icon}`}>
    <LiveVideo color="#f3425f" />
    Live Video
  </div>
  <div className={`hover1 ${classes.createPost_icon}`}>
    <Photo color="#4bbf67" />
    Photo/Video
  </div>
  <div className={`hover1 ${classes.createPost_icon}`}>
    <Feeling color="#f7b928" />
    Feeling/Activity
  </div>
</div>
</div>
}