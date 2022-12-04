/////////// IMPORTS
///
import classes from "./Post.module.css"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import { Dots, Public } from "../../svg"
import { useEffect, useRef, useState } from "react"
import ReactsPopup from "./ReactsPopup"
import {CreateComment} from "./CreateComment"
import PostMenu from "./PostMenu"
import { useSelector } from "react-redux"
import { useClickOutside } from "../../helpers/clickOutside"
import Comment from "./Comment"
import { getReacts, reactPost } from "../../helpers/postFunction"

///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Post = ({ post, profile }) => {
  /////////// VARIABLES
  ///
  const postDotsRef = useRef()
  const postRef = useRef()
  const commentInp = useRef()
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)

  ///
  /////////// STATES
  ///
  const [showMenu, setShowMenu] = useState(false)
  useClickOutside(postDotsRef, () => setShowMenu(false))
  const [comments, setComments] = useState([])
  const [count, setCount] = useState(1)
  const [reacts, setReacts] = useState()
  const [check, setCheck] = useState()
  const [total, setTotal] = useState(0)
    const [checkSaved, setCheckSaved] = useState()
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    getPostReacts()
    // setComments(post?.comments)
  }, [post])

  useEffect(() => {
    // getPostReacts()
    setComments(post?.comments)
  }, [post])

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  const reactHandler = async (type) => {
    reactPost(post?._id, type, user.token)
    if (check == type) {
      setCheck()
      let index = reacts.findIndex((x) => x.react == check)
      if (index !== -1) {
        if (reacts[index])
          setReacts([...reacts, (reacts[index].count = --reacts[index].count)])
        setTotal((prev) => --prev)
      }
    } else {
      setCheck(type)
      let index = reacts.findIndex((x) => x.react == type)
      let index1 = reacts.findIndex((x) => x.react == check)
      if (index !== -1) {
        if (reacts[index])
          setReacts([...reacts, (reacts[index].count = ++reacts[index].count)])
        setTotal((prev) => ++prev)
      }
      if (index1 !== -1) {
        if (reacts[index])
          setReacts([
            ...reacts,
            (reacts[index1].count = --reacts[index1].count),
          ])
        setTotal((prev) => --prev)
      }
    }
  }

  const focusComment = () => commentInp.current.focus()
  
  ///
  /////////// FUNCTIONS
  ///
  const getPostReacts = async () => {
    const res = await getReacts(post?._id, user?.token)
    setReacts(res.reacts)
    setCheck(res.check)
    setTotal(res.total)
    setCheckSaved(res.checkSaved)
  }

  const showMore = () => {
    setCount((prev) => prev + 3)
  }

  ///
  return (
    <div
      ref={postRef}
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
              postId={post?._id}
              checkSaved={checkSaved}
              setCheckSaved={setCheckSaved}
              images={post?.images}
              postRef={postRef}
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
      ) : post?.type === null ? (
        <>
          <div className={classes.post_text}>{post?.text}</div>
          {post?.images && post?.images?.length && (
            <div
              className={
                post?.images?.length === 1
                  ? "grid_1"
                  : post?.images?.length === 2
                  ? "grid_2"
                  : post?.images?.length === 3
                  ? "grid_3"
                  : post?.images?.length === 4
                  ? "grid_4"
                  : post?.images?.length >= 5 && "grid_5"
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
              {post?.images?.length > 5 && (
                <div className={classes.more_pics_shadow}>
                  +{post?.images?.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post?.type === "profilePicture" ? (
        <>
          <div className={classes.post_text}>{post?.text}</div>
          <div className={classes.post_profile_wrap}>
            <div className={classes.post_updated_bg}>
              <img src={post?.user.cover} alt="" />
            </div>
            <img
              src={post?.images?.length && post?.images[0].url}
              alt=""
              className={classes.post_updated_picture}
            />
          </div>
        </>
      ) : (
        <div className={classes.post_cover_wrap}>
          <img src={post?.images?.length && post?.images[0].url} alt="" />
        </div>
      )}
      <div className={classes.post_infos}>
        <div className={classes.reacts_count}>
          <div className={classes.reacts_count_imgs}>
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        key={i}
                        src={`../../../reacts/${react.react}.svg`}
                        alt=""
                      />
                    )
                )}
          </div>
          <div className={classes.reacts_count_num}>{total > 0 && total}</div>
        </div>
        <div className={classes.to_right}>
          <div className={classes.comments_count}>
            {comments?.length} comments
          </div>
          <div className={classes.share_count}>0 share</div>
        </div>
      </div>
      <div className={classes.post_actions}>
        <div className={classes.post_reacting}>
          <div className={classes.reacts_popup}>
            <ReactsPopup reactHandler={reactHandler} />
          </div>

          <div
            className={`hover1 ${classes.post_action}`}
            onClick={() => reactHandler(check ? check : "like")}
          >
            {check ? (
              <img
                src={`../../../reacts/${check}.svg`}
                alt="reaction img"
                style={{ width: "18px" }}
              />
            ) : (
              <i className="like_icon invertToWhite"></i>
            )}
            <span
              style={{
                color: `
          
          ${
            check === "like"
              ? "#4267b2"
              : check === "love"
              ? "#f63459"
              : check === "haha"
              ? "#f7b125"
              : check === "sad"
              ? "#f7b125"
              : check === "wow"
              ? "#f7b125"
              : check === "angry"
              ? "#e4605a"
              : ""
          }
          `,
                textTransform: "capitalize",
              }}
            >
              {check ? check : "Like"}
            </span>
          </div>
        </div>
        <div className={`hover1 ${classes.post_action}`}>
          <i className="comment_icon invertToWhite"></i>
          <span onClick={focusComment}>Comment</span>
        </div>
        <div className={`hover1 ${classes.post_action}`}>
          <i className="share_icon invertToWhite"></i>
          <span>Share</span>
        </div>
      </div>
      <div className={classes.comments_wrap}>
        <div className={classes.comments_order}></div>
        <CreateComment
          ref={commentInp}
          postId={post?._id}
          setComments={setComments}
          setCount={setCount}
        />

        {comments && comments?.length > 0 && (
          <div className={classes.allCommentsWrapper}>
            {comments
              .sort((a, b) => {
                return new Date(b.commentAt) - new Date(a.commentAt)
              })
              .slice(0, count)
              .map((comment, i) => (
                <Comment comment={comment} key={i} />
              ))}
          </div>
        )}

        {count < comments?.length && (
          <div className={classes.view_comments} onClick={showMore}>
            View more comments
          </div>
        )}
      </div>
    </div>
  )
}
