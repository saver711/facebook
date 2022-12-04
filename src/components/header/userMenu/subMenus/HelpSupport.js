import classes from "../UserMenu.module.css";
export default function HelpSupport({visibleUpdater}) {

  const goBackHandler = ()=> visibleUpdater(0)
  return (
    <div className={classes.absolute_wrap}>
      <div className={classes.absolute_wrap_header}>
        <div className={`circle hover1`} onClick={goBackHandler}>
          <i className="arrow_back_icon"></i>
        </div>
        Help & Support
      </div>

      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="help_center_icon"></i>
        </div>
        <span>Help Center</span>
      </div>

      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="email_icon"></i>
        </div>
        <span>Support Inbox</span>
      </div>

      <div className={`hover3 ${classes.menu_item}`}>
        <div className="small_circle">
          <i className="info_filled_icon"></i>
        </div>
        <span>Report a Problem</span>
      </div>

    </div>
  );
}
