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

///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
function App() {
  /////////// VARIABLES
  ///
  const [{ loading, error, posts }, dispatcher] = useReducer(postReducer, {
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
  }, [])
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
      dispatcher({
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
      dispatcher({
        type: postCases.POST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatcher({
        type: postCases.POST_ERROR,
        payload: error.response.data.message,
      })
    }
  }
  ///
  return (
    <>
      {createPostVisibility && (
        <CreatePostPopup
          createPostVisibilityUpdater={createPostVisibilityUpdater}
        />
      )}

      <Routes>
        {/* <Routes > */}
        <Route path="/welcome/*" element={whereToGoFromWelcome} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <Home
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
              />
            }
          />
          <Route
            path="/profile/:username/*"
            element={
              <Profile
                createPostVisibilityUpdater={createPostVisibilityUpdater}
              />
            }
          />
          <Route
            path="/reset"
            element={<Reset title="Facebook | Reset password" />}
          />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
