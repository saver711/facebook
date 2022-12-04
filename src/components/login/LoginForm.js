/////////// IMPORTS
///
import classes from "./LoginForm.module.css";
import { useState } from "react";
import { Formik, Form } from "formik";
import { LoginInput } from "../../components/inputs/loginInput/LoginInput";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../reducers/slices/userSlice";
import Cookies from "js-cookie";
import { ConnectedFocusError } from "focus-formik-error";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const LoginForm = () => {
  /////////// VARIABLES
  ///
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
      ),
  });
  ///
  /////////// STATES
  ///

  const [error, errorUpdater] = useState("");
  const [loading, loadingUpdater] = useState(false);
  ///
  /////////// CUSTOM HOOKS
  ///
  const dispatch = useDispatch();
  const navigate = useNavigate();
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  const loginSubmit = async (values) => {
    try {
      loadingUpdater(true);
      errorUpdater("");
      const {data} = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      dispatch(userActions.userLoginHandler(data));
      localStorage.setItem("registerData", null)
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
      loadingUpdater(false);
    } catch (error) {
      loadingUpdater(false);
      // errorUpdater(error.response.data?.message);
      errorUpdater(error?.message);
    }
  };
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <>
      <div className={classes.login_wrap}>
        <div className={classes.login_1}>
          <img src="../../icons/facebook.svg" alt="" />
          <span>
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className={classes.login_2}>
          <div className={classes.login_2_wrap}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginValidation}
              onSubmit={(values) => loginSubmit(values)}
            >
              {(formik) => (
                <Form>
                  <ConnectedFocusError />
                  <LoginInput
                    type="email"
                    name="email"
                    placeholder="Your E-mail address"
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <button type="submit" className="blue_btn btn">
                    Log In
                  </button>
                </Form>
              )}
            </Formik>
            <Link to="/reset" className={classes.forgot_password}>
              Forgotten password?
            </Link>
            <RingLoader color="#1876f2" loading={loading} size={30} />

            {error && <p className="error">{error}</p>}
            <div className={classes.sign_splitter}></div>
            <Link to="register" className="blue_btn btn open_signup">
              Create Account
            </Link>
          </div>
          <Link to="/" className={classes.sign_extra}>
            <b>Create a Page </b>
            for a celebrity, brand or business.
          </Link>
        </div>
      </div>
    </>
  );
};
