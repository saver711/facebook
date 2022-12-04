import classes from './Stories.module.css'

export default function Story({ story }) {
  return (
    <div className={classes.story}>
      <img src={story.image} alt="story image" className={classes.story_img} />
      <div className={classes.story_profile_pic}>
        <img src={story.profile_picture} alt="" />
      </div>
      <div className={classes.story_profile_name}>{story.profile_name}</div>
    </div>
  );
}
