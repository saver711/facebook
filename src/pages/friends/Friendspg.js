/////////// IMPORTS
///
import classes from "./Friendspg.module.css"
import { Helmet } from "react-helmet"
import { Header } from "../../components/header/Header"
import { Link, useParams } from "react-router-dom"
import Card from "./Card"
import { friendsCases, friendspage } from "../../helpers/reducers"
import { useEffect, useReducer } from "react"
import { getFriendsPageInfos } from "../../helpers/userFunctions"
import { useSelector } from "react-redux"
///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Friendspg = ({ title }) => {
  /////////// VARIABLES
  ///
  const { type } = useParams()
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)
  ///
  /////////// STATES
  ///
  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: "",
  })
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    getData()
  }, [])
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///
  const getData = async () => {
    dispatch({ type: friendsCases.FRIENDS_REQUEST })

    const data = await getFriendsPageInfos(user?.token)

    if (data?.status === "ok") {
      dispatch({ type: friendsCases.FRIENDS_SUCCESS, payload: data?.data })
    } else {
      dispatch({ type: friendsCases.FRIENDS_ERROR, payload: data?.data })
    }
  }

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header page="friends" getData={getData} />
      <div className={classes.friends}>
        <div className={classes.friends_left}>
          <div className={classes.friends_left_header}>
            <h3>Friends</h3>
            <div className="small_circle">
              <i className="settings_filled_icon invertToWhite"></i>
            </div>
          </div>
          <div className={classes.friends_left_wrap}>
            <Link
              to="/friends"
              className={`${classes.mmenu_item} hover3 ${
                type === undefined ? classes.active_friends : ""
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon invertToWhite"></i>
              </div>
              <span>Home</span>
              <div className={classes.rArrow}>
                <i className="right_icon invertToWhite"></i>
              </div>
            </Link>
            <Link
              to="/friends/requests"
              className={`${classes.mmenu_item} hover3 ${
                type === "requests" ? classes.active_friends : ""
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon invertToWhite"></i>
              </div>
              <span>Friend Requests</span>
              <div className={classes.rArrow}>
                <i className="right_icon invertToWhite"></i>
              </div>
            </Link>
            <Link
              to="/friends/sent"
              className={`${classes.mmenu_item} hover3 ${
                type === "sent" ? classes.active_friends : ""
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon invertToWhite"></i>
              </div>
              <span>Sent Requests</span>
              <div className={classes.rArrow}>
                <i className="right_icon invertToWhite"></i>
              </div>
            </Link>
            <div className={`hover3 ${classes.mmenu_item}`}>
              <div className="small_circle">
                <i className="friends_suggestions_icon invertToWhite"></i>
              </div>
              <span>Suggestions</span>
              <div className={classes.rArrow}>
                <i className="right_icon invertToWhite"></i>
              </div>
            </div>
            <Link
              to="/friends/all"
              className={`${classes.mmenu_item} hover3 ${
                type === "all" ? classes.active_friends : ""
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon invertToWhite"></i>
              </div>
              <span>All Friends</span>
              <div className={classes.rArrow}>
                <i className="right_icon invertToWhite"></i>
              </div>
            </Link>
            <div className={`hover3 ${classes.mmenu_item}`}>
              <div className="small_circle">
                <i className="birthdays_icon invertToWhite"></i>
              </div>
              <span>Birthdays</span>
              <div className={classes.rArrow}>
                <i className="right_icon invertToWhite"></i>
              </div>
            </div>
            <div className={`hover3 ${classes.mmenu_item}`}>
              <div className="small_circle">
                <i className="all_friends_icon invertToWhite"></i>
              </div>
              <span>Custom Lists</span>
              <div className={classes.rArrow}>
                <i className="right_icon invertToWhite"></i>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.friends_right}>
          {(type === undefined || type === "requests") && (
            <div className={classes.friends_right_wrap}>
              <div className={classes.friends_left_header}>
                <h3>Friend Requests</h3>
                {type === undefined && data?.requests?.length > 3 && (
                  <Link
                    to="/friends/requests"
                    className={`hover3 ${classes.see_link}`}
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className={classes.flex_wrap}>
                {data?.requests?.length > 0 &&
                  data?.requests
                    .slice(0, 3)
                    .map((user) => (
                      <Card
                        userr={user}
                        key={user?._id}
                        type="request"
                        getData={getData}
                      />
                    ))}
              </div>
            </div>
          )}
          {(type === undefined || type === "sent") && (
            <div className={classes.friends_right_wrap}>
              <div className={classes.friends_left_header}>
                <h3>Sent Requests</h3>
                {type === undefined && data?.sentRequests?.length > 3 && (
                  <Link
                    to="/friends/sent"
                    className={`hover3 ${classes.see_link}`}
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className={classes.flex_wrap}>
                {data?.sentRequests?.length > 0 &&
                  data?.sentRequests
                    .slice(0, 3)
                    .map((user) => (
                      <Card
                        userr={user}
                        key={user?._id}
                        type="sent"
                        getData={getData}
                      />
                    ))}
              </div>
            </div>
          )}
          {(type === undefined || type === "all") && (
            <div className={classes.friends_right_wrap}>
              <div className={classes.friends_left_header}>
                <h3>Friends</h3>
                {type === undefined && data?.friends?.length > 3 && (
                  <Link
                    to="/friends/all"
                    className={`hover3 ${classes.see_link}`}
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className={classes.flex_wrap}>
                {data?.friends?.length > 0 &&
                  data?.friends
                    .slice(0, 3)
                    .map((user) => (
                      <Card
                        userr={user}
                        key={user?._id}
                        type="friends"
                        getData={getData}
                      />
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
