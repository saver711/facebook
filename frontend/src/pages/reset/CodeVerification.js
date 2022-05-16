/////////// IMPORTS
///
import classes from './Reset.module.css'
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { LoginInput } from "../../components/inputs/loginInput/LoginInput";
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import RingLoader from "react-spinners/RingLoader";
import { ConnectedFocusError } from "focus-formik-error";
///
/////////// HELPER FUNCTIONS
///

///
export const CodeVerification = ({ forwarding, userInfo }) => {
  /////////// VARIABLES
  ///
  const resetValidation = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .matches(/^\d+$/, "Code must be a number")
      .test(
        "code-length",
        "Code must be exactly 5 characters long",
        (value) => value?.length === 5
      ),
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
  const handleCode = async (code) => {
    try {
      loadingUpdater(true);
      errorUpdater("");
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email:userInfo.email, code }
      );
      forwarding(3)
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
    <div transition={{ duration: "0.4" }} className={classes.reset_form}>
      <p className={classes.reset_form_header}>Code Verification</p>
      <p className={classes.reset_form_text}>
        Please enter the code you received in your email
      </p>
      <Formik
        initialValues={{
          code: ``,
        }}
        validationSchema={resetValidation}
        onSubmit={({ code }) => handleCode(code)}
      >
        {(formik) => (
          <Form>
            <ConnectedFocusError />
            <div className="resetAnyInput">
              <LoginInput type="text" name="code" placeholder="Code" />
              {error && <p className="error text_center">{error}</p>}
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
                  Continue
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
};