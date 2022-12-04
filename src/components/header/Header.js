/////////// IMPORTS
///
import classes from "./Header.module.css"
import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState, useRef } from "react"
import { AllMenu } from "./AllMenu"
import { useClickOutside } from "../../helpers/clickOutside"

import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg"
import { SearchMenu } from "./SearchMenu"
import { UserMenu } from "./userMenu/UserMenu"
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///
const rest = `hover1 ${classes.middle_icon}`
///
const color = "#65676b"
///
export const Header = ({ page, getAllPosts }) => {
  /////////// VARIABLES
  ///
  const allMenuRef = useRef()
  const userMenu = useRef()
  const friendsLength = 0
  ///
  /////////// STATES
  ///
  const [showSearchMenu, showSearchMenuUpdater] = useState(false)
  const [allMenuVisibility, allMenuVisibilityUpdater] = useState(false)
  const [userMenuVisibility, userMenuVisibilityUpdater] = useState(false)

  // header_right icons classes conditionally
  const allMenuIconClasses = allMenuVisibility
    ? `hover1 ${classes.circle_icon} ${classes.active_header}`
    : `hover1 ${classes.circle_icon}`

  const userMenuIconClasses = userMenuVisibility
    ? `hover1 ${classes.circle_icon} ${classes.active_header}`
    : `hover1 ${classes.circle_icon}`
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)
  useClickOutside(allMenuRef, () => allMenuVisibilityUpdater(false))
  useClickOutside(userMenu, () => userMenuVisibilityUpdater(false))
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const showSearchMenuHandler = () => {
    showSearchMenuUpdater(true)
  }

  const toggleAllMenuVisibility = () => {
    allMenuVisibilityUpdater((prevState) => !prevState)
  }

  const toggleUserMenu = () => {
    userMenuVisibilityUpdater((prevState) => !prevState)
  }
  ///
  /////////// FUNCTIONS
  ///
  ///
  return (
    <header>
      <div className={classes.header_left}>
        <Link
          to="/"
          onClick={() => getAllPosts()}
          className={classes.header_logo}
        >
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className={`search ${classes.search1}`}
          onClick={showSearchMenuHandler}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className={classes.hide_input}
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          showSearchMenuUpdater={showSearchMenuUpdater}
          color={color}
        />
      )}
      <div className={classes.header_middle}>
        <NavLink
          to="/"
          onClick={() => getAllPosts()}
          className={({ isActive }) =>
            isActive ? `${classes.active} ${rest}` : rest
          }
        >
          {page === "home" ? <HomeActive /> : <Home />}
        </NavLink>

        <NavLink
          to="/friends"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${rest}` : rest
          }
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
          {friendsLength ? (
            <span className={classes.middle_notification}>{friendsLength}</span>
          ) : null}
        </NavLink>
        <NavLink
          to="/watch"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${rest}` : rest
          }
        >
          <Watch color={color} />
          <span className={classes.middle_notification}>9+</span>
        </NavLink>
        <NavLink
          to="/market"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${rest}` : rest
          }
        >
          <Market color={color} />
        </NavLink>
        <NavLink
          to="/gaming"
          className={({ isActive }) =>
            isActive ? `${classes.active} ${rest}` : rest
          }
        >
          <Gaming color={color} />
        </NavLink>
      </div>
      <div className={classes.header_right}>
        <Link
          to="/profile"
          className={`hover1 ${classes.profile_link} ${
            page === "profile" && classes.active_link
          }`}
        >
          <img src={user?.picture} alt="user picture" />
          <span>{user?.first_name}</span>
        </Link>
        <div className={allMenuIconClasses} ref={allMenuRef}>
          <div
            className={classes.circle_icon_inner}
            onClick={toggleAllMenuVisibility}
          >
            <Menu />
          </div>
          {allMenuVisibility && (
            <AllMenu allMenuVisibilityUpdater={allMenuVisibilityUpdater} />
          )}
        </div>
        <div className={`hover1 ${classes.circle_icon}`}>
          <div className={classes.circle_icon_inner}>
            <Messenger />
          </div>
        </div>
        <div className={`hover1 ${classes.circle_icon}`}>
          <div className={classes.circle_icon_inner}>
            <Notifications />
          </div>
        </div>
        <div className={userMenuIconClasses} ref={userMenu}>
          <div className={classes.circle_icon_inner} onClick={toggleUserMenu}>
            <ArrowDown />
          </div>

          {userMenuVisibility && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  )
}
