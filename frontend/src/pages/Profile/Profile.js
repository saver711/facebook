/////////// IMPORTS
///
import axios from "axios"
import { useEffect, useReducer, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { photosCases, photosReducer, profileCases, profileReducer } from "../../helpers/reducers"
import { NotFound } from "../not found/NotFound"
import Cover from "./Cover"
import classes from "./Profile.module.css"
import ProfilePictureInfos from "./PictureProfileInfos"
import ProfileMenu from "./ProfileMenu"
import PeopleYouMayKnow from "./PeopleYouMayKnow"
import { CreatePost } from "../../components/crete post/CreatePost"
import GridPosts from "./GridPosts"
import { Post } from "../../components/post/Post"
import Photos from "./Photos"
import Friends from "./Friends"
import { Intro } from "../../components/intro/Intro"
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

export const Profile = ({ title, createPostVisibilityUpdater }) => {
  /////////// VARIABLES
  ///

  
  const user = useSelector((state) => state.userReducer.userData)
  const { username } = useParams()
  const userName = username === undefined ? user?.username : username

  const visitor = userName === user.username ? false : true

  const path = `${userName}/*`
  const max = 30
  const sort = "desc"

  ///
  /////////// STATES
  ///
  const [otherName, setOtherName] = useState()
  const [{ loading, error, profile }, dispatcher] = useReducer(profileReducer, {
    loading: false,
    error: "",
    profile: {},
  })

  // const [photos, photosUpdater] = useState([])

    const [{ loadingPhotos, errorPhotos, photos }, dispatcherPhotos] =
      useReducer(photosReducer, {
        loadingPhotos: false,
        errorPhotos: "",
        photos: {},
      })

  const [showProfile, showProfileUpdater] = useState(true)
  ///
  /////////// CUSTOM HOOKS
  ///
  const navigate = useNavigate()
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    getProfile()
  }, [userName])
  useEffect(() => {
    setOtherName(profile?.details?.otherName)
  }, [profile])

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///
  const getProfile = async () => {
    try {
      dispatcherPhotos({
        type: photosCases.PHOTOS_REQUEST,
      })
      dispatcher({
        type: profileCases.PROFILE_REQUEST,
      })
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      if (data.ok === false) {
        showProfileUpdater(false)
        return
      }
      dispatcher({
        type: profileCases.PROFILE_SUCCESS,
        payload: data,
      })
      try {
        
        const images = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/listImages/`,
          { path, sort, max },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        dispatcherPhotos({type: photosCases.PHOTOS_SUCCESS, payload: images.data})
        // photosUpdater(images.data)
      } catch (error) {
        
        console.log(error)
      }
    } catch (error) {
      dispatcher({
        type: profileCases.PROFILE_ERROR,
        payload: error.response.data.message,
      })
    }
  }

  ///
  return (
    <>
      <Helmet>
        <title>Facebook | {userName}</title>
      </Helmet>
      {showProfile ? (
        <div className={classes.profile}>
          <Header page="profile" />
          <div className={classes.profile_top}>
            <div className={classes.profile_container}>
              <Cover
                cover={profile?.cover}
                visitor={visitor}
                photos={photos.resources}
              />
              <ProfilePictureInfos
                profile={profile}
                visitor={visitor}
                photos={photos.resources}
                otherName={otherName}
              />
              <ProfileMenu userName={userName} />
            </div>
          </div>
          <div className={classes.profile_bottom}>
            <div className={classes.profile_container}>
              <div className={classes.bottom_container}>
                <PeopleYouMayKnow />
                <div
                  className={`${classes.profile_grid}
                  
                  `}
                >
                  <div className={classes.profile_left}>
                    <div className="stickyContainer profile_left_sticky scrollbar">
                      <Intro
                        comingDetails={profile?.details}
                        visitor={visitor}
                        setOtherName={setOtherName}
                      />
                      <Photos
                        userName={userName}
                        token={user?.token}
                        photos={photos}
                        loading={loadingPhotos}
                      />
                      <Friends friends={profile?.friends} />
                      <div
                        style={{ marginTop: "10px" }}
                        className="fb_copyright"
                      >
                        <Link to="/">Privacy </Link>
                        <span>. </span>
                        <Link to="/">Terms </Link>
                        <span>. </span>
                        <Link to="/">Advertising </Link>
                        <span>. </span>
                        <Link to="/">
                          Ad Choices <i className="ad_choices_icon"></i>{" "}
                        </Link>
                        <span>. </span>
                        <Link to="/">Cookies </Link>
                        <span>. </span>
                        <Link to="/">More </Link>
                        <span>. </span>
                        {/* {check && <br />} */}
                        Meta © 2022
                      </div>
                    </div>
                  </div>
                  <div className={classes.profile_right}>
                    {!visitor && (
                      <CreatePost
                        user={user}
                        profile
                        createPostVisibilityUpdater={
                          createPostVisibilityUpdater
                        }
                      />
                    )}
                    <GridPosts />
                    <div>
                      {profile?.posts && profile?.posts.length ? (
                        profile?.posts?.map((post) => (
                          <Post
                            post={post}
                            user={user}
                            key={post._id}
                            profile
                          />
                        ))
                      ) : (
                        <div className={classes.no_posts}>
                          No posts available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  )
}
