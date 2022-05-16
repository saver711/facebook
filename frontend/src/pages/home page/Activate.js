/////////// IMPORTS
///
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/header/Header";
import { LeftHome } from "../../components/home/left/LeftHome";
import { Stories } from "../../components/home/stories/Stories";
import { RightHome } from "../../components/home/right/RightHome";
import classes from "./Home.module.css";
import { CreatePost } from "../../components/crete post/CreatePost";
import { ActivateForm } from "./ActivateForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { userActions } from "../../reducers/slices/userSlice";
import { Helmet } from "react-helmet";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

export const Activate = ({title}) => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///
  const user = useSelector((state) => state.userReducer.userData);
  const [success, successUpdater] = useState("");
  const [error, errorUpdater] = useState("");
  const [loading, loadingUpdater] = useState(true);
  ///
  /////////// CUSTOM HOOKS
  ///
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    activateAccount();
  }, []);
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///
  const activateAccount = async () => {
    try {
      loadingUpdater(true);
      errorUpdater("");
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      successUpdater(data.message);

      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch(userActions.verify(true));
      setTimeout(() => {
        loadingUpdater(false);
        navigate("/");
      }, 2300);
    } catch (error) {
      errorUpdater(error.response.data.message);

      setTimeout(() => {
        loadingUpdater(false);
        navigate("/");
      }, 2300);
    }
  };

  ///
  return (
    <div className={classes.home}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ActivateForm
          type={success ? "success" : "error"}
          header={success ? "Account verification success" : "Account verification error"}
          text={success ? success : error}
          loading={loading}
        />
      {/* {success && (
        <ActivateForm
          type="success"
          header="Account verification success"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification error"
          text={error}
          loading={loading}
        />
      )} */}
      <Header page='home' />
      <LeftHome user={user} />
      <div className={classes.home_middle_container}>
        <div className={classes.home_middle}>
          <Stories />
          <CreatePost />
        </div>
      </div>
      <RightHome />
    </div>
  );
};
