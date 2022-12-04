import Moment from "react-moment"
import { Link } from "react-router-dom"
import classes from "./Post.module.css"

export default function Comment({ comment }) {
  return (
    <div className={classes.comment}>
      <Link to={`/profile/${comment.commentBy.username}`}>
        <img
          src={comment.commentBy.picture}
          alt=""
          className={classes.comment_img}
        />
      </Link>
      <div className={classes.comment_col}>
        <div className={classes.comment_wrap}>
          <Link
            to={`/profile/${comment.commentBy.username}`}
            className={classes.comment_name}
          >
            {comment.commentBy.first_name} {comment.commentBy.last_name}
          </Link>
          <div className={classes.comment_text}>{comment.comment}</div>
        </div>
        {comment.image && (
          <img src={comment.image} alt="" className={classes.comment_image} />
        )}
        <div className={classes.comment_actions}>
          <span>Like</span>
          <span>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  )
}
