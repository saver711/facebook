import { Link } from "react-router-dom";
import classes from "../UserMenu.module.css";
export default function SettingsPrivacy({visibleUpdater}) {

  const goBackHandler = ()=> visibleUpdater(0)
  return (
    <div className={classes.absolute_wrap}>
      <div className={classes.absolute_wrap_header}>
        <div className={`circle hover1`} onClick={goBackHandler}>
          <i className="arrow_back_icon"></i>
        </div>
        Settings & privacy
      </div>
      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="settings_filled_icon"></i>
        </div>
        <span>Settings</span>
      </div>

      <Link to='/reset' className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="privacy_checkup_icon"></i>
        </div>
        <span>Password Reset</span>
      </Link>

      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="privacy_shortcuts_icon"></i>
        </div>
        <span>Privacy Center</span>
      </div>

      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="activity_log_icon"></i>
        </div>
        <span>Activity log</span>
      </div>

      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="news_icon"></i>
        </div>
        <span>News Feed Preferences</span>
      </div>

      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="language_icon"></i>
        </div>
        <span>Language</span>
      </div>
    </div>
  );
}
