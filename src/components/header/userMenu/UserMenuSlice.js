/////////// IMPORTS
///
import classes from "./UserMenu.module.css";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const UserMenuSlice = ({icon, text, ...props}) => {
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
    <div className={`${classes.menu_item} hover3`} {...props}>
      <div className="small_circle">
        <i className={icon}></i>
      </div>
      <span>{text}</span>
      <div className={classes.rArrow}>
        <i className="right_icon"></i>
      </div>
    </div>
  );
};
