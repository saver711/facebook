/////////// IMPORTS
///
import classes from "./LoginFooter.module.css";
import { Link } from "react-router-dom";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const LoginFooter = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///

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

  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <>
      <footer className={classes.login_footer}>
        <div className={classes.login_footer_wrap}>
          <Link to="/">English (UK)</Link>
          <Link to="/">العربية</Link>
          <Link to="/">Français (France)</Link>
          <Link to="/">Italiano</Link>
          <Link to="/">Deutsch</Link>
          <Link to="/">Русский</Link>
          <Link to="/">Español</Link>
          <Link to="/">Bahasa Indonesia</Link>
          <Link to="/">Türkçe</Link>
          <Link to="/">Português (Brasil)</Link>
          <Link to="/">हिन्दी</Link>
        </div>

        <div className={classes.footer_splitter}></div>

        <div className={classes.login_footer_wrap}>
          <Link to="/">Sign Up</Link>
          <Link to="/">Log In</Link>
          <Link to="/">Messenger</Link>
          <Link to="/">Facebook Lite</Link>
          <Link to="/">Watch</Link>
          <Link to="/">Places</Link>
          <Link to="/">Games</Link>
          <Link to="/">Marketplace</Link>
          <Link to="/">Facebook Pay</Link>
          <Link to="/" target="_blank">
            Oculus
          </Link>
          <Link to="/" target="_blank">
            Portal
          </Link>
          <Link to="/" target="_blank">
            Instagram
          </Link>
          <Link to="/" title="Take a look at Bulletin newsletter">
            Bulletin
          </Link>
          <Link to="/" title="Browse our Local Lists directory.">
            Local
          </Link>
          <Link to="/">Fundraisers</Link>
          <Link to="/" title="Browse our Facebook Services directory.">
            Services
          </Link>
          <Link to="/" title="See the Voting Information Centre">
            Voting Information Centre
          </Link>
          <Link to="/" title="Explore our groups.">
            Groups
          </Link>
          <Link
            to="/"
            title="Read our blog, discover the resource centre and find job opportunities."
          >
            About
          </Link>
          <Link to="/" title="Advertise on Facebook">
            Create ad
          </Link>
          <Link to="/" title="Create a Page">
            Create Page
          </Link>
          <Link to="/" title="Develop on our platform.">
            Developers
          </Link>
          <Link
            to="/"
            title="Make your next career move to our brilliant company."
          >
            Careers
          </Link>
          <Link to="/" title="Learn about your privacy and Facebook.">
            {" "}
            Privacy{" "}
          </Link>
          <Link to="/" title="Learn about cookies and Facebook.">
            {" "}
            Cookies
          </Link>

          <Link to="/" title="Learn about AdChoices.">
            AdChoices <i className="addChoices_icon"></i>
          </Link>

          <Link to="/" accessKey="9" title="Review our terms and policies.">
            Terms
          </Link>

          <Link to="/" accessKey="0" title="Visit our Help Centre.">
            Help{" "}
          </Link>

          <Link
            accessKey="6"
            to="/"
            title="View and edit your Facebook settings."
          >
            Settings
          </Link>
          <Link accessKey="7" to="/" title="View your activity log">
            Activity log
          </Link>
        </div>
        <div className={classes.login_footer_wrap}>
          <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
            Meta @ 2022
          </Link>
        </div>
      </footer>
    </>
  );
};
