/////////// IMPORTS
///
import { useRef, useState } from "react";
import { Return, Search } from "../../svg";
import classes from "./SearchMenu.module.css";
import { useClickOutside } from "../../helpers/clickOutside";
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
  const searchMenuRef = useRef();
  const searchInpRef = useRef();

  ///
  /////////// STATES
  ///
const [magnifierVisible, magnifierVisibleUpdater] = useState(true);
  ///
  /////////// CUSTOM HOOKS
  ///
  useClickOutside(searchMenuRef, () => showSearchMenuUpdater(false))
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
  const hideSearchMenuHandler = () => {
    showSearchMenuUpdater(false);
  };

  const focusSearchInputHandler = () => {
      searchInpRef.current.focus();
  }

  const hideMagnifierIconHandler = ()=> magnifierVisibleUpdater(false);
  const showMagnifierIconHandler = ()=> magnifierVisibleUpdater(true);
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
              {magnifierVisible && <div><Search color={color} /></div> }

          <input autoFocus onBlur={showMagnifierIconHandler} onFocus={hideMagnifierIconHandler} ref={searchInpRef} type="text" placeholder="Search Facebook" />
        </div>
      </div>
      <div className={classes.search_history_header}>
        <span>Recent searches</span>
        <a href="#">Edit</a>
      </div>
      <div className={classes.search_history}></div>
      <div className={`${classes.search_results} scrollbar`}></div>
    </div>
  );
};
