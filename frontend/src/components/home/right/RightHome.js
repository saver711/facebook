/////////// IMPORTS
///
import classes from "./RightHome.module.css";
import { Dots, NewRoom, Search } from "../../../svg";
import { Contact } from "./Contact";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///
const color = "#65676b";
///
export const RightHome = () => {
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
    <div className={classes.right_home}>
      <div className={classes.heading}>Sponsored</div>
      <div className="splitter1"></div>
      <div className={classes.contacts_wrap}>
        <div className={classes.contacts_header}>
          <div className={classes.contacts_header_left}>Contacts</div>
          <div className={classes.contacts_header_right}>
            <div className={`hover2 ${classes.contact_circle}`}>
              <NewRoom color={color} />
            </div>
            <div className={`hover2 ${classes.contact_circle}`}>
              <Search color={color} />
            </div>
            <div className={`hover2 ${classes.contact_circle}`}>
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className={classes.contacts_list}>
          <Contact />
        </div>
      </div>
    </div>
  );
};
