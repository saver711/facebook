import classes from "./Friendspg.module.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../helpers/userFunctions"

export default function Card({ userr, type, getData }) {
  const user = useSelector((state) => state.userReducer.userData)
  const cancelRequestHandler = async (userId) => {
    const res = await cancelRequest(userId, user?.token)
    if (res == "ok") {
      getData()
    }
  }
  const confirmHandler = async (userId) => {
    const res = await acceptRequest(userId, user?.token)
    if (res == "ok") {
      getData()
    }
  }
  const deleteHandler = async (userId) => {
    const res = await deleteRequest(userId, user?.token)
    if (res == "ok") {
      getData()
    }
  }
  return (
    <div className={classes.req_card}>
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className={classes.req_name}>
        {userr.first_name} {userr.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="blue_btn btn"
          onClick={() => cancelRequestHandler(userr._id)}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="blue_btn btn"
            onClick={() => confirmHandler(userr._id)}
          >
            Confirm
          </button>
          <button
            className="gray_btn btn"
            onClick={() => deleteHandler(userr._id)}
          >
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  )
}
