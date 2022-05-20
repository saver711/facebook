/////////// IMPORTS
///
import { useState } from "react";
import { Link } from "react-router-dom";
import DisplayAccessibility from "./subMenus/DisplayAccessibility";
import HelpSupport from "./subMenus/HelpSupport";
import SettingsPrivacy from "./subMenus/SettingsPrivacy";
import classes from "./UserMenu.module.css";
import { UserMenuSlice } from "./UserMenuSlice";
import { userActions } from "../../../reducers/slices/userSlice";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const UserMenu = ({ user }) => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///
  const [visible, visibleUpdater] = useState(0);
  ///
  /////////// CUSTOM HOOKS
  ///
const dispatch = useDispatch()
const navigate = useNavigate()
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
const logOutHandler = ()=>{
  dispatch(userActions.logout())
  navigate('/welcome')
}
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <motion.div
      initial={{ x: "140vw" }}
      animate={{ x: "0" }}
      exit={{ x: "140vw" }}
      transition={{ duration: ".3" }}
      className={classes.menu}
    >
      {/* Main */}
      {visible === 0 && (
        <div>
          <Link to="/profile" className={`hover3 ${classes.menu_header}`}>
            <img src={user?.picture} alt="" />
            <div className={classes.menu_col}>
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className={classes.menu_splitter}></div>
          <div className={`${classes.menu_main} hover3`}>
            <div className="small_circle">
              <i className="report_filled_icon"></i>
            </div>
            <div className={classes.menu_col}>
              <span className={classes.menu_span1}>Give feedback</span>
              <span className={classes.menu_span2}>
                Help us improve facebook
              </span>
            </div>
          </div>
          <div className={classes.menu_splitter}></div>
          <UserMenuSlice
            onClick={() => visibleUpdater(1)}
            text="Settings & Privacy"
            icon="settings_filled_icon"
          />
          <UserMenuSlice
            onClick={() => visibleUpdater(2)}
            text="Help & Support"
            icon="help_filled_icon"
          />
          <UserMenuSlice
            onClick={() => visibleUpdater(3)}
            text="Display & Accessability"
            icon="dark_filled_icon"
          />
          <UserMenuSlice
            onClick={logOutHandler}
            text="Logout"
            icon="logout_filled_icon"
          />
        </div>
      )}

      {/* Settings & Privacy */}
      {visible === 1 && <SettingsPrivacy visibleUpdater={visibleUpdater} />}
      {visible === 2 && <HelpSupport visibleUpdater={visibleUpdater} />}
      {visible === 3 && (
        <DisplayAccessibility visibleUpdater={visibleUpdater} />
      )}
    </motion.div>
  );
};
