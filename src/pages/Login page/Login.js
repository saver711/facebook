/////////// IMPORTS
///
import classes from "./Login.module.css";
import { LoginForm } from "../../components/login/LoginForm";
import { LoginFooter } from "../../components/login/LoginFooter";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import { RegisterForm } from "../register page/RegisterForm";

///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const Login = ({title}) => {
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
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div
        className={classes.login}
      >
        <div className={classes.login_wrapper}>
          <LoginForm />
          <Routes>
            <Route
              path="/register"
              element={<RegisterForm title="Facebook | Register" />}
            />
          </Routes>
          <LoginFooter />
        </div>
      </div>
    </>
  );
};
