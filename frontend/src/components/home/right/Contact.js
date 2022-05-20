/////////// IMPORTS
///

///
/////////// HELPER FUNCTIONS
///

import { Link } from "react-router-dom"
import classes from "./RightHome.module.css"
///
/////////// HELPER VARIABLES
///

///
export const Contact = ({ friend }) => {
  /////////// VARIABLES
  ///
  
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
  return (
    <Link to={`/profile/${friend.username}`} className={`hover3 ${classes.contact}`}>
      <div className={classes.contact_img}>
        <img src={friend?.picture} alt="friend picture" />
      </div>
      <span>
        {friend?.first_name} {friend?.last_name}
      </span>
    </Link>
  )
}
