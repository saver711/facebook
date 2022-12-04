/////////// IMPORTS
///
import classes from "./Reset.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { LoginInput } from "../../components/inputs/loginInput/LoginInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import RingLoader from "react-spinners/RingLoader";
import { ConnectedFocusError } from "focus-formik-error";
import { motion } from "framer-motion";
///
/////////// HELPER FUNCTIONS
///

///
export const ChangePassword = ({userInfo}) => {
  /////////// VARIABLES
  ///
  const resetValidation = Yup.object({
    password: Yup.string()
      .required("New Password is required")
      .min(6, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
      ),
    conf_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  ///
  /////////// CUSTOM HOOKS
  ///
  const navigate = useNavigate()
  ///
  /////////// STATES
  ///
  const [error, errorUpdater] = useState("");
  const [success, successUpdater] = useState(false);
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
  const changePasswordHandler = async (password) => {
    try {
      errorUpdater("");
      loadingUpdater(true);
      
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {password, email:userInfo.email});

      successUpdater(true)
      //navigation
      setTimeout(()=>{
        navigate("/");
      }, 2220)


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
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: "0.4" }}
      className={classes.reset_form}
    >
      <p className={classes.reset_form_header}>Change Password</p>
      <p className={classes.reset_form_text}>Please enter your new password</p>
      <Formik
        initialValues={{
          password: ``,
          conf_password: ``,
        }}
        validationSchema={resetValidation}
        onSubmit={({ password }) => changePasswordHandler(password)}
      >
        {(formik) => (
          <Form>
            <ConnectedFocusError />
            <div className="resetAnyInput">
              <LoginInput
                type="password"
                name="password"
                placeholder="New password"
              />
            </div>
            <div className="resetAnyInput">
              <LoginInput
                type="password"
                name="conf_password"
                placeholder="Confirm New password"
              />
            </div>
            {error && <div className="error">{error}</div>}
            {success && (
              <div className="success">Password changed successfully</div>
            )}
            <div className="mySplitter"></div>
            <div className={classes.reset_form_btns}>
              <div>
                <RingLoader loading={loading} size={30} color="#1876f2" />
              </div>
              <div>
                <Link to="/" className={`gray_btn btn ${classes.badBtn}`}>
                  Cancel
                </Link>
                <button type="submit" className="blue_btn btn">
                  Confirm
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
};
