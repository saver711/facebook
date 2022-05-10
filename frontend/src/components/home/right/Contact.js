/////////// IMPORTS
///

///
/////////// HELPER FUNCTIONS
///
import { useSelector } from "react-redux";
import classes from "./RightHome.module.css";
///
/////////// HELPER VARIABLES
///

///
export const Contact = () => {
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
  return (
    <div className={`hover3 ${classes.contact}`}>
      <div className={classes.contact_img}>
        <img src={user?.picture} alt="user picture" />
      </div>
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
};
