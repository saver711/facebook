import { NavLink } from "react-router-dom"
import { Dots } from "../../svg"
import classes from "./Profile.module.css"

export default function ProfileMenu({userName}) {
  return (
    <div className={classes.profile_menu_wrap}>
      <div className={classes.profile_menu}>
        <NavLink end
          to={`/profile/${userName}`}
          className={({ isActive }) =>
            isActive ? classes.profile_menu_active : "hover1"
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive ? classes.profile_menu_active : "hover1"
          }
        >
          About
        </NavLink>
        <NavLink
          to="friends"
          className={({ isActive }) =>
            isActive ? classes.profile_menu_active : "hover1"
          }
        >
          Friends
        </NavLink>
        <NavLink
          to="photos"
          className={({ isActive }) =>
            isActive ? classes.profile_menu_active : "hover1"
          }
        >
          Photos
        </NavLink>
        <NavLink
          to="videos"
          className={({ isActive }) =>
            isActive ? classes.profile_menu_active : "hover1"
          }
        >
          Videos
        </NavLink>
        <NavLink
          to="map"
          className={({ isActive }) =>
            isActive ? classes.profile_menu_active : "hover1"
          }
        >
          Check-ins
        </NavLink>
        <div className="hover1">More</div>
        <div className={classes.p10_dots}>
          <Dots />
        </div>
      </div>
    </div>
  )
}
