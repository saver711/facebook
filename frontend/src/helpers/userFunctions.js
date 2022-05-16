import axios from "axios"
export const updateProfilePictureFun = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return "ok"
  } catch (error) {
    return error.response.data.message
  }
}
export const updateCoverFun = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateCover`,
      {
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return "ok"
  } catch (error) {
    return error.response.data.message
  }
}
