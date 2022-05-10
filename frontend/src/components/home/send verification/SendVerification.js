/////////// IMPORTS
///
import classes from "./SendVerification.module.css";
import { useState } from "react";
import axios from "axios";
import {useSelector} from 'react-redux';
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const SendVerification = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///
  const [success, successUpdater] = useState("");
  const [error, errorUpdater] = useState("");
  ///
  /////////// CUSTOM HOOKS
  ///
const user = useSelector(state => state.userReducer.userData)
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
              Authorization: `Bearer ${user?.token}`
          },
        }
      );
      successUpdater(data.message)
    } catch (error) {
      errorUpdater(error.response.data.message);
    }
  };
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className={classes.send_verification}>
      <p>
        Your account is not verified yet, if you don't verify it within a month
        from creating date it will be deleted entirely.
      </p>
      <a onClick={sendVerificationLink}>
        click here to Re-send verification link
      </a>

      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};
