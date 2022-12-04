/////////// IMPORTS
///
import classes from "./AllMenu.module.css";
import { menu, create } from "../../data/allMenu";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const AllMenu = ({allMenuVisibilityUpdater}) => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///
const user = useSelector(state => state.userReducer.userData)
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
  const hideAllMenuHandler = () => allMenuVisibilityUpdater(prevSate => !prevSate);
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className={classes.all_menu}>
      <div className={classes.all_menu_header}>Menu</div>
      <div className={`${classes.all_menu_wrap} scrollbar`}>
        <div className={classes.all_left}>
          <Link
            onClick={hideAllMenuHandler}
            to="/profile"
            className={`hover1 ${classes.all_menu_item} ${classes.menu_profile}`}
          >
            <img
              style={{ borderRadius: "50%" }}
              src={user?.picture}
              alt="user image"
            />
            <div className={classes.all_menu_col}>
              <p
                style={{ fontWeight: "600", fontSize: "15px" }}
              >{`${user?.first_name} ${user?.last_name}`}</p>
              <span>See your profile</span>
            </div>
          </Link>
          <div className={classes.all_menu_search}>
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search menu" />
          </div>
          {/* left menu group */}
          <div className={classes.all_menu_group}>
            <ul>
              <h2 className={classes.all_menu_group_header}>Social</h2>
              {menu.slice(0, 6).map((item, index) => (
                <li
                  onClick={hideAllMenuHandler}
                  key={index}
                  className={`${classes.all_menu_item} hover1`}
                >
                  <img
                    src={`../../left/${item.icon}.png`}
                    alt="left menu icon"
                  />
                  <div className={classes.all_menu_col}>
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* left menu group */}
          <div className={classes.all_menu_group}>
            <ul>
              <h2 className={classes.all_menu_group_header}>Entertainment</h2>
              {menu.slice(6, 9).map((item, index) => (
                <li
                  onClick={hideAllMenuHandler}
                  key={index}
                  className={`${classes.all_menu_item} hover1`}
                >
                  <img
                    src={`../../left/${item.icon}.png`}
                    alt="left menu icon"
                  />
                  <div className={classes.all_menu_col}>
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* left menu group */}
          <div className={classes.all_menu_group}>
            <ul>
              <h2 className={classes.all_menu_group_header}>Shopping</h2>
              {menu.slice(9, 11).map((item, index) => (
                <li
                  onClick={hideAllMenuHandler}
                  key={index}
                  className={`${classes.all_menu_item} hover1`}
                >
                  <img
                    src={`../../left/${item.icon}.png`}
                    alt="left menu icon"
                  />
                  <div className={classes.all_menu_col}>
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* left menu group */}
          <div className={classes.all_menu_group}>
            <ul>
              <h2 className={classes.all_menu_group_header}>Personal</h2>
              {menu.slice(11, 15).map((item, index) => (
                <li
                  onClick={hideAllMenuHandler}
                  key={index}
                  className={`${classes.all_menu_item} hover1`}
                >
                  <img
                    src={`../../left/${item.icon}.png`}
                    alt="left menu icon"
                  />
                  <div className={classes.all_menu_col}>
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* left menu group */}
          <div className={classes.all_menu_group}>
            <ul>
              <h2 className={classes.all_menu_group_header}>Professional</h2>
              {menu.slice(15, 17).map((item, index) => (
                <li
                  onClick={hideAllMenuHandler}
                  key={index}
                  className={`${classes.all_menu_item} hover1`}
                >
                  <img
                    src={`../../left/${item.icon}.png`}
                    alt="left menu icon"
                  />
                  <div className={classes.all_menu_col}>
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* left menu group */}
          <div className={classes.all_menu_group}>
            <ul>
              <h2 className={classes.all_menu_group_header}>
                Community Recurses
              </h2>
              {menu.slice(17, 21).map((item, index) => (
                <li
                  onClick={hideAllMenuHandler}
                  key={index}
                  className={`${classes.all_menu_item} hover1`}
                >
                  <img
                    src={`../../left/${item.icon}.png`}
                    alt="left menu icon"
                  />
                  <div className={classes.all_menu_col}>
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* left menu group */}
          <div className={classes.all_menu_group}>
            <ul>
              <h2 className={classes.all_menu_group_header}>More from Meta</h2>
              {menu.slice(21, 23).map((item, index) => (
                <li
                  onClick={hideAllMenuHandler}
                  key={index}
                  className={`${classes.all_menu_item} hover1`}
                >
                  <img
                    src={`../../left/${item.icon}.png`}
                    alt="left menu icon"
                  />
                  <div className={classes.all_menu_col}>
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes.all_right}>
          <h2 className={classes.all_right_header}>Create</h2>
          <ul>
            {create.map((item, index) => (
              <li
                onClick={hideAllMenuHandler}
                key={index}
                className={`hover1 ${classes.all_right_item}`}
              >
                <div className={classes.all_right_circle}>
                  <i className={item.icon}></i>
                </div>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
};
