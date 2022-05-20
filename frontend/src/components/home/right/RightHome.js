/////////// IMPORTS
///
import { useEffect, useReducer } from "react"
import { useSelector } from "react-redux"
import { friendsCases, friendspage } from "../../../helpers/reducers"
import { getFriendsPageInfos } from "../../../helpers/userFunctions"
import classes from "./RightHome.module.css"
import { Dots, NewRoom, Search } from "../../../svg"
import { Contact } from "./Contact"
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///
const color = "#65676b"
///
export const RightHome = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///
  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: "",
  })
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)
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
    <div className={classes.right_home}>
      <div className={classes.heading}>Sponsored</div>
      <div className="splitter1"></div>
      <div className={classes.contacts_wrap}>
        <div className={classes.contacts_header}>
          <div className={classes.contacts_header_left}>Contacts</div>
          <div className={classes.contacts_header_right}>
            <div className={`hover2 ${classes.contact_circle}`}>
              <NewRoom color={color} />
            </div>
            <div className={`hover2 ${classes.contact_circle}`}>
              <Search color={color} />
            </div>
            <div className={`hover2 ${classes.contact_circle}`}>
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className={classes.contacts_list}>
          {data?.friends?.length > 0 &&
            data?.friends?.map((friend) => (
              <Contact key={friend._id} friend={friend} />
            ))}
        </div>
      </div>
    </div>
  )
}
