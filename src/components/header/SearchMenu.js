/////////// IMPORTS
///
import { useEffect, useRef, useState } from "react"
import { Return, Search } from "../../svg"
import classes from "./SearchMenu.module.css"
import { useClickOutside } from "../../helpers/clickOutside"
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  searchFunc,
} from "../../helpers/userFunctions"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const SearchMenu = ({ color, showSearchMenuUpdater }) => {
  /////////// VARIABLES
  ///
  const searchMenuRef = useRef()
  const searchInpRef = useRef()

  ///
  /////////// STATES
  ///
  const [magnifierVisible, magnifierVisibleUpdater] = useState(true)
  const [searchTerm, searchTermUpdater] = useState("")
  const [results, resultsUpdater] = useState([])
  const [searchHistory, searchHistoryUpdater] = useState([])
  ///
  /////////// CUSTOM HOOKS
  ///
  useClickOutside(searchMenuRef, () => showSearchMenuUpdater(false))
  const user = useSelector((state) => state.userReducer.userData)
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    getHistory()
  }, [])
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const searchHandler = async (e) => {
    if (searchTerm === "") {
      resultsUpdater([])
    } else {
      const res = await searchFunc(searchTerm, user?.token)
      resultsUpdater(res)
    }
  }

  const handleRemove = async (searchedUser) => {
    removeFromSearch(searchedUser, user?.token)
    setTimeout(() => {
      getHistory()
    }, 150);
  }

  const clickOnSearchItem = (searchedUser) => {
    showSearchMenuUpdater(false)
    addToSearchHistory(searchedUser, user?.token)
  }
  ///
  /////////// FUNCTIONS
  ///
  const getHistory = async () => {
    const res = await getSearchHistory(user?.token)
    searchHistoryUpdater(res)
  }
  const hideSearchMenuHandler = () => {
    showSearchMenuUpdater(false)
  }

  const focusSearchInputHandler = () => {
    searchInpRef.current.focus()
  }

  const hideMagnifierIconHandler = () => magnifierVisibleUpdater(false)
  const showMagnifierIconHandler = () => magnifierVisibleUpdater(true)
  ///

  return (
    <div
      ref={searchMenuRef}
      className={`${classes.header_Left} ${classes.search_area} scrollbar`}
    >
      <div className={classes.search_wrap}>
        <div className={classes.header_logo}>
          <div
            className={`circle pointer hover1`}
            onClick={hideSearchMenuHandler}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className={`search ${classes.search}`}
          onClick={focusSearchInputHandler}
        >
          {magnifierVisible && (
            <div>
              <Search color={color} />
            </div>
          )}

          <input
            autoFocus
            onBlur={showMagnifierIconHandler}
            onFocus={hideMagnifierIconHandler}
            ref={searchInpRef}
            type="text"
            value={searchTerm}
            placeholder="Search Facebook"
            onChange={(e) => searchTermUpdater(e.target.value)}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      {searchHistory.length > 0 && results.length === 0 && (
        <div className={classes.search_history_header}>
          <span>Recent searches</span>
          <a href="#">Edit</a>
        </div>
      )}

      {searchHistory.length > 0 && results.length === 0 && (
        <div className={`scrollbar ${classes.search_history}`}>
          {searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt)
            })
            .map((user) => (
              <div
                className={`hover1 ${classes.search_user_item}`}
                key={user._id}
              >
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => clickOnSearchItem(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon invertToWhite"
                  onClick={() => {
                    handleRemove(user.user._id)
                  }}
                ></i>
              </div>
            ))}
        </div>
      )}

      {results.length > 0 && (
        <div className={`${classes.search_results} scrollbar`}>
          {results.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className={`hover1 ${classes.search_user_item}`}
              onClick={() => clickOnSearchItem(user?._id)}
              key={user._id}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
