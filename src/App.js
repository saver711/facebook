import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/home page/Home"
import { Login } from "./pages/Login page/Login"
import { Profile } from "./pages/Profile/Profile"
import { useSelector } from "react-redux"
import { NotFound } from "./pages/not found/NotFound"
import { Activate } from "./pages/home page/Activate"
import { Reset } from "./pages/reset/Reset"
import { CreatePostPopup } from "./components/createPostPopup/CreatePostPopup"
import { useEffect, useReducer, useState } from "react"
import axios from "axios"
import { postCases, postReducer } from "./helpers/reducers"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { Friendspg } from "./pages/friends/Friendspg"

///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
function App() {
  /////////// VARIABLES
  ///
  const [{ loading, error, posts }, postsDispatcher] = useReducer(postReducer, {
    loading: false,
    error: "",
    posts: [],
  })
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)

  ///
  /////////// STATES
  ///
  const [createPostVisibility, createPostVisibilityUpdater] = useState(false)
  const theme = useSelector(state => state.themeReducer.theme)

  const whereToGoFromWelcome = user ? (
    <Navigate replace to="/" />
  ) : (
    <Login title="Facebook | welcome" />
  )

  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    user && getAllPosts()
  }, [user])
  ///
  /////////// IF CASES
  ///
  
  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///
  const getAllPosts = async () => {
    
    try {
      postsDispatcher({
        type: postCases.POST_REQUEST,
      })
      
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      postsDispatcher({
        type: postCases.POST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      postsDispatcher({
        type: postCases.POST_ERROR,
        payload: error.response.data?.message,
      })
    }
  }
  ///
  return (
    <div className={theme}>
      {createPostVisibility && (
        <CreatePostPopup
          createPostVisibilityUpdater={createPostVisibilityUpdater}
          postsDispatcher={postsDispatcher}
          posts={posts}
        />
      )}

      <Routes>
        {/* <Routes > */}
        <Route path="/welcome/*" element={whereToGoFromWelcome} />
        <Route
          path="/reset"
          element={<Reset title="Facebook | Reset password" />}
        />

        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <Home
                getAllPosts={getAllPosts}
                loading={loading}
                posts={posts}
                title="Facebook"
                createPostVisibilityUpdater={createPostVisibilityUpdater}
              />
            }
          />

          <Route
            path="/activate/:token"
            element={<Activate title="Facebook | Activate" />}
          />
          
          <Route
            path="/profile"
            element={
              <Profile
                createPostVisibilityUpdater={createPostVisibilityUpdater}
                getAllPosts={getAllPosts}
              />
            }
          />
          <Route
            path="/profile/:username/"
            element={
              <Profile
                createPostVisibilityUpdater={createPostVisibilityUpdater}
                getAllPosts={getAllPosts}
              />
            }
          />

          <Route
            path="/friends"
            element={<Friendspg title="Facebook | Friends" />}
          />
          <Route
            path="/friends/:type"
            element={<Friendspg title="Facebook | Friends" />}
          />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
