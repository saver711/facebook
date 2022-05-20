/////////// IMPORTS
///
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../reducers/slices/userSlice";
import classes from "./Reset.module.css";
import { SearchAccount } from "./SearchAccount";
import { useState } from "react";
import { SendEmail } from "./SendEmail";
import { CodeVerification } from "./CodeVerification";
import { LoginFooter } from "../../components/login/LoginFooter";
import { ChangePassword } from "./ChangePassword";
import { Helmet } from "react-helmet";

///
/////////// HELPER FUNCTIONS
///

///
export const Reset = ({title}) => {
  /////////// VARIABLES
  ///
  let email, code;
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  ///
  /////////// STATES
  ///
  const [whatComponentToRender, whatComponentToRenderUpdater] = useState(0);
  const [userInfo, userInfoUpdater] = useState('');
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const logoutHandler = () => {
    dispatch(userActions.logout());
    navigate("/welcome");
  };

  ///
  /////////// FUNCTIONS
  ///
  
  return (
    <div className={classes.reset}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={classes.reset_header}>
        <Link to="/">
          <img src="../../../icons/facebook.svg" alt="" />
        </Link>
        {user ? (
          <div className={classes.right_reset}>
            <Link to="/profile">
              <img src={user?.picture} alt="user picture" />
            </Link>
            <button onClick={logoutHandler} className="blue_btn btn">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/welcome" className={classes.right_reset}>
            <button className="blue_btn btn">Login</button>
          </Link>
        )}
      </div>
      <div className={classes.reset_wrap}>
        {whatComponentToRender === 0 && (
          <SearchAccount
            userInfoUpdater={userInfoUpdater}
            forwarding={whatComponentToRenderUpdater}
          />
        )}
        {whatComponentToRender === 1 && userInfo && (
          <SendEmail
            forwarding={whatComponentToRenderUpdater}
            userInfo={userInfo}
          />
        )}
        {whatComponentToRender === 2 && (
          <CodeVerification
            userInfo={userInfo}
            forwarding={whatComponentToRenderUpdater}
          />
        )}
        {whatComponentToRender === 3 && <ChangePassword userInfo={userInfo} />}
      </div>
      <LoginFooter />
    </div>
  )
};
