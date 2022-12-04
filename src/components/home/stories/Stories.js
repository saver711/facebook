/////////// IMPORTS
///
import classes from "./Stories.module.css";
import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/home";
import Story from "./Story";
import {useMediaQuery} from "react-responsive";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const Stories = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const maxWidth940 = useMediaQuery({
    query: "(max-width: 940px)"
  });
  const minWidth830 = useMediaQuery({
    query: "(min-width: 831px)"
  });
  const maxWidth710 = useMediaQuery({
    query: "(max-width: 710px)"
  });

  const maxStoriesNum = (minWidth830 && maxWidth940) ? 5 : maxWidth710 ? 3 : 4;
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
    <div className={classes.stories}>
      <div className={classes.create_story_card}>
        <img
          src="../../../images/default_pic.png"
          alt=""
          className={classes.create_story_img}
        />
        <div className={classes.plus_story}>
          <Plus color="#fff" />
        </div>
        <div className={classes.story_create_text}>Create Story</div>
      </div>
      {stories.slice(0, maxStoriesNum).map((story, i) => (
        <Story key={i} story={story} />
      ))}
      <div className={classes.white_circle}>
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};
