/////////// IMPORTS
///
import classes from "./Post.module.css"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import { Dots, Public } from "../../svg"
import { useRef, useState } from "react"
import ReactsPopup from "./ReactsPopup"
import CreateComment from "./CreateComment"
import PostMenu from "./PostMenu"
import { useSelector } from "react-redux"
import { useClickOutside } from "../../helpers/clickOutside"

///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Post = ({ post, profile }) => {
  /////////// VARIABLES
  ///
  const postDotsRef = useRef()
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)

  ///
  /////////// STATES
  ///
  const [showMenu, setShowMenu] = useState(false)
  useClickOutside(postDotsRef, () => setShowMenu(false))
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
    <div
      className={classes.post}
      // style={{width: `${profile && '100%'}`}}
    >
      <div className={classes.post_header}>
        <Link
          to={`/profile/${post?.user.username}`}
          className={classes.post_header_left}
        >
          <img src={post?.user.picture} alt="user picture" />
          <div className={classes.header_col}>
            <div className={classes.post_profile_name}>
              {post?.user.first_name} {post?.user.last_name}
              <div className={classes.updated_p}>
                {post?.type == "profilePicture" &&
                  `updated ${
                    post?.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post?.type == "coverPicture" &&
                  `updated ${
                    post?.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className={classes.post_profile_privacy_date}>
              <Moment fromNow interval={30}>
                {post?.createdAt}
              </Moment>
              <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div ref={postDotsRef}>
          <div
            className="hover1 post_header_right"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Dots color="#828387" />
          </div>

          {showMenu && (
            <PostMenu
              postUserId={post?.user._id}
              imagesLength={post?.images?.length}
              setShowMenu={setShowMenu}
            />
          )}
        </div>
      </div>
      {post?.background ? (
        <div
          className={classes.post_bg}
          style={{ backgroundImage: `url(${post?.background})` }}
        >
          <div className={classes.post_bg_text}>{post?.text}</div>
        </div>
      ) : post?.type === "null" ? (
        <>
          <div className={classes.post_text}>{post?.text}</div>
          {post?.images && post?.images.length && (
            <div
              className={
                post?.images.length === 1
                  ? "grid_1"
                  : post?.images.length === 2
                  ? "grid_2"
                  : post?.images.length === 3
                  ? "grid_3"
                  : post?.images.length === 4
                  ? "grid_4"
                  : post?.images.length >= 5 && "grid_5"
              }
            >
              {post?.images.slice(0, 5).map((image, i) => (
                <img
                  src={image.url}
                  key={i}
                  alt={`post image ${i}`}
                  className={`img-${i}`}
                />
              ))}
              {post?.images.length > 5 && (
                <div className={classes.more_pics_shadow}>
                  +{post?.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === "profilePicture" ? (
        <div className={classes.post_profile_wrap}>
          <div className={classes.post_updated_bg}>
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0].url}
            alt=""
            className={classes.post_updated_picture}
          />
        </div>
      ) : (
        <div className={classes.post_cover_wrap}>
          <img src={post.images[0].url} alt="" />
        </div>
      )}
      <div className={classes.post_infos}>
        <div className={classes.reacts_count}>
          <div className={classes.reacts_count_imgs}></div>
          <div className={classes.reacts_count_num}></div>
        </div>
        <div className={classes.to_right}>
          <div className={classes.comments_count}>13 comments</div>
          <div className={classes.share_count}>1 share</div>
        </div>
      </div>
      <div className={classes.post_actions}>
        <div className={`hover1 ${classes.post_action}`}>
          <div className={classes.reacts_popup}>
            <ReactsPopup />
          </div>
          <i className="like_icon"></i>
          <span>Like</span>
        </div>
        <div className={`hover1 ${classes.post_action}`}>
          <i className={classes.comment_icon}></i>
          <span>Comment</span>
        </div>
        <div className={`hover1 ${classes.post_action}`}>
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className={classes.comments_wrap}>
        <div className={classes.comments_order}></div>
        <CreateComment />
      </div>
    </div>
  )
}
