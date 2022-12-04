/////////// IMPORTS
///
import { useSelector } from "react-redux"
import { Header } from "../../components/header/Header"
import { LeftHome } from "../../components/home/left/LeftHome"
import { Stories } from "../../components/home/stories/Stories"
import { RightHome } from "../../components/home/right/RightHome"
import classes from "./Home.module.css"
import { CreatePost } from "../../components/crete post/CreatePost"
import { SendVerification } from "../../components/home/send verification/SendVerification"
import { Helmet } from "react-helmet"
import { Post } from "../../components/post/Post"
import { BounceLoader } from "react-spinners"
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

export const Home = ({getAllPosts, title, createPostVisibilityUpdater, posts, loading }) => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///
  const user = useSelector((state) => state.userReducer.userData)
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
  // useClickOutside(ref, () => visibleUpdater(false));

  ///
  return (
    <div className={classes.home}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className={classes.home_middle_container}>
        <div className={classes.home_middle}>
          <Stories />
          {!user?.verified && <SendVerification />}
          <CreatePost
            createPostVisibilityUpdater={createPostVisibilityUpdater}
          />
          <div>
            <div className={classes.postsLoader}>
              <BounceLoader loading={loading} size={40} color="#1876f2" />
            </div>
            {posts &&
              posts.length > 0 &&
              posts?.map((post) => <Post key={post._id} post={post} />)}
          </div>
        </div>
      </div>
      <RightHome />
    </div>
  )
}
