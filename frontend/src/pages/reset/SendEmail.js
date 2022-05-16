/////////// IMPORTS
///
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Reset.module.css";
import RingLoader from "react-spinners/RingLoader";
///
/////////// HELPER FUNCTIONS
///

///
export const SendEmail = ({ forwarding, userInfo }) => {
  /////////// VARIABLES
  ///
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData);
  ///
  /////////// STATES
  ///
  const [error, errorUpdater] = useState("");
  const [loading, loadingUpdater] = useState(false);
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const goBackHandler = () => forwarding(0);
  const sendEmailHandler = async () => {
    try {
      loadingUpdater(true);
      errorUpdater("");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email: userInfo.email }
      );
      forwarding(2);
      loadingUpdater(false);
    } catch (error) {
      loadingUpdater(false);
      errorUpdater(error.response.data.message);
    }
  };
  ///
  /////////// FUNCTIONS
  ///

  ///

  ///
  return (
    <>
      <div className={classes.reset_form}>
        <p className={classes.reset_form_header}>Reset Your Password</p>
        <div className={classes.reset_grid}>
          <div className={classes.reset_left}>
            <p className={classes.reset_form_text}>
              How do you want to reset your password?
            </p>
            <label htmlFor="email">
              <input type="radio" checked readOnly id="email" />
              <div className={classes.label_col}>
                <span>Send code via E-mail</span>
                <span>{userInfo.email}</span>
              </div>
            </label>
          </div>
          <div className={classes.reset_right}>
            <img src={userInfo.picture} alt="user picture" />
            <span>{userInfo.email}</span>
            <span>Facebook user</span>
          </div>
        </div>
        {error && <p className="error text_center">{error}</p>}
        <div className="mySplitter"></div>
        <div className={classes.reset_form_btns}>
          <div>
            <RingLoader loading={loading} size={30} color="#1876f2" />
          </div>
          <div>
            <button
              onClick={goBackHandler}
              className={`gray_btn btn ${classes.badBtn}`}
            >
              Not you?
            </button>
            <button onClick={sendEmailHandler} className="blue_btn btn">
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  )
};
