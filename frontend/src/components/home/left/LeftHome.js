/////////// IMPORTS
///
import classes from "./LeftHome.module.css";
import { LeftLink } from "./LeftLink";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowUp1, ArrowDown1 } from "../../../svg";
import { useState } from "react";
import { Shortcut } from "./Shortcut";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const LeftHome = ({ user }) => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///
  const [leftHomeRestVisibility, leftHomeRestVisibilityUpdater] =
    useState(false);

  const theRest = leftHomeRestVisibility
    ? left
        .slice(8)
        .map((link, i) => (
          <LeftLink
            key={i}
            img={link.img}
            text={link.text}
            notification={link.notification}
          />
        ))
    : null;
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
  const leftHomeVisibilityToggler = () =>
    leftHomeRestVisibilityUpdater((prevState) => !prevState);
  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className={`scrollbar ${classes.left_home}`}>
      <div className={classes.left_home_inner}>
        <Link to="/profile" className={`hover2 ${classes.left_link}`}>
          <img src={user?.picture} alt="user picture" />
          <span>
            {user?.first_name}
          </span>
        </Link>
        {left.slice(0, 8).map((link, i) => (
          <LeftLink
            key={i}
            img={link.img}
            text={link.text}
            notification={link.notification}
          />
        ))}
        {leftHomeRestVisibility && theRest}
      </div>
      <div
        className={`hover3 ${classes.left_link}`}
        onClick={leftHomeVisibilityToggler}
      >
        <div className="small_circle">
          {leftHomeRestVisibility ? <ArrowUp1 /> : <ArrowDown1 />}
        </div>
        <span>See {leftHomeRestVisibility ? "less" : "more"}</span>
      </div>
      <div className={`splitter ${classes.splitter}`}></div>
      <div className={classes.shortcut}>
        <div className={classes.heading}>Your Shortcuts</div>
        <div className={classes.edit_shortcut}>Edit</div>
      </div>
      <div className={classes.shortcut_list}>
        <Shortcut
          link="https://www.instagram.com/ahmedhassan_713/"
          img="../../images/insta.png"
          name="My Instagram "
        />
        {/* <Shortcut
          link="https://www.youtube.com"
          img="../../images/ytb.png"
          name="My Youtube channel"
        /> */}
      </div>
      <div className="fb_copyright welcome_footer">
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          AdChoices <i className="ad_choices_icon"></i>
        </Link>
        <span>. </span>
        <Link to="/">Cookies </Link>
        <span>. </span>
        <Link to="/">More </Link>
        <span>. </span> <br />
        Meta © 2022
      </div>
    </div>
  )
};
