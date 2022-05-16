import classes from "../UserMenu.module.css";
export default function DisplayAccessibility({ visibleUpdater }) {
  const goBackHandler = () => visibleUpdater(0);
  return (
    <div className={classes.absolute_wrap}>
      <div className={classes.absolute_wrap_header}>
        <div className={`circle hover1`} onClick={goBackHandler}>
          <i className="arrow_back_icon"></i>
        </div>
        Display & Accessibility
      </div>
      <div className={classes.menu_main}>
        <div className="small_circle" style={{ width: "70px", height: "40px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className={classes.menu_col}>
          <span className={classes.menu_span1}>Dark Mode</span>
          <span className={classes.menu_span2}>
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input defaultChecked type="radio" name="dark" id="darkOff" />
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkOn" />
      </label>
      <label htmlFor="automatic" className="hover1">
        <div>
          <span>Automatic</span>
          <p>
            We’ll automatically adjust the display based on your device’s system
            settings.
          </p>
        </div>
        <input type="radio" name="dark" id="automatic" />
      </label>
      <div className={classes.menu_main}>
        <div className="small_circle" style={{ width: "70px", height: "40px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className={classes.menu_col}>
          <span className={classes.menu_span1}>Compact Mode</span>
          <span className={classes.menu_span2}>
            Make your font size smaller so more content can fit on the screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input defaultChecked type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>
      <div className={`${classes.menu_item} hover3`}>
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className={classes.rArrow}>
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}
