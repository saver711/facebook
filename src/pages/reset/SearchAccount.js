/////////// IMPORTS
///
import classes from "./Reset.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { LoginInput } from "../../components/inputs/loginInput/LoginInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { ConnectedFocusError } from "focus-formik-error";
import { motion } from "framer-motion";
///
/////////// HELPER FUNCTIONS
///

///
export const SearchAccount = ({ userInfoUpdater, forwarding }) => {
  /////////// VARIABLES
  ///
  const resetValidation = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  ///
  /////////// CUSTOM HOOKS
  ///

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
  const handleSearch = async (email) => {
    try {
      loadingUpdater(true);
      errorUpdater("");
      const {data} = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      userInfoUpdater(data);
      loadingUpdater(false);
      forwarding(1)
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
      <p className={classes.reset_form_header}>Find Your Account</p>
      <p className={classes.reset_form_text}>
        Enter your email address and we'll send you a link to reset
      </p>
      <Formik
        initialValues={{
          email: ``,
        }}
        validationSchema={resetValidation}
        onSubmit={({ email }) => handleSearch(email)}
      >
        {(formik) => (
          <Form>
            <ConnectedFocusError />
            <div className="resetAnyInput">
              <LoginInput
                type="email"
                name="email"
                placeholder="Your E-mail address"
              />
              {error && <p className="error">{error}</p>}
            </div>
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
                  Search
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
};
