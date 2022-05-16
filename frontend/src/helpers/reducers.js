export const postCases = {
  POST_REQUEST: "POST_REQUEST",
  POST_SUCCESS: "POST_SUCCESS",
  POST_ERROR: "POST_ERROR",
}
export const postReducer = (state, action) => {
  switch (action.type) {
    case postCases.POST_REQUEST:
      return { ...state, loading: true, error: "" }
    case postCases.POST_SUCCESS:
      return { ...state, loading: false, error: "", posts: action.payload }
    case postCases.POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        posts: action.payload,
      }

    default:
      return state
  }
}


export const profileCases = {
  PROFILE_REQUEST: "PROFILE_REQUEST",
  PROFILE_SUCCESS: "PROFILE_SUCCESS",
  PROFILE_ERROR: "PROFILE_ERROR",
}
export const profileReducer = (state, action) => {
  switch (action.type) {
    case profileCases.PROFILE_REQUEST:
      return { ...state, loading: true, error: "" }
    case profileCases.PROFILE_SUCCESS:
      return { ...state, loading: false, error: "", profile: action.payload }
    case profileCases.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        profile: action.payload,
      }

    default:
      return state
  }
}

export const photosCases = {
  PHOTOS_REQUEST: "PHOTOS_REQUEST",
  PHOTOS_SUCCESS: "PHOTOS_SUCCESS",
  PHOTOS_ERROR: "PHOTOS_ERROR",
}
export const photosReducer = (state, action) => {
  switch (action.type) {
    case "PHOTOS_REQUEST":
      return { ...state, loadingPhotos: true, errorPhotos: "" }
    case "PHOTOS_SUCCESS":
      return {
        ...state,
        loadingPhotos: false,
        photos: action.payload,
        errorPhotos: "",
      }
    case "PHOTOS_ERROR":
      return { ...state, loadingPhotos: false, errorPhotos: action.payload }

    default:
      return state
  }
}

