import { useState } from "react"
import MenuItem from "./MenuItem"
import classes from "./Post.module.css"
import { useSelector } from "react-redux"
import { deletePost, postSavingFun } from "../../helpers/postFunction"
import {saveAs} from 'file-saver'

export default function PostMenu({
  postId,
  postUserId,
  imagesLength,
  setCheckSaved,
  checkSaved,
  images,
  postRef,
}) {
  const user = useSelector((state) => state.userReducer.userData)
  const [test, setTest] = useState(postUserId === user?.id)

  const saveHandler = async () => {
    postSavingFun(postId, user?.token)
    setCheckSaved((prev) => !prev)
  }

  const downloadImages = async () => {
    images?.map((img, i) => saveAs(img.url, `image${i}.png`))
  }

  const deletePostHandler = async () => {
    const res = await deletePost(postId, user?.token)
    res.status === "ok" && postRef.current.remove()
    
  }
  return (
    <ul className={classes.post_menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={saveHandler}>
        {!checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        ) : (
          <MenuItem
            icon="unSave_icon"
            title="Unsave Post"
            subtitle="Remove this from saved items."
          />
        )}
      </div>

      <div className={classes.line}></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imagesLength && (
        <div onClick={downloadImages}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}

      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translations" />}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <div onClick={deletePostHandler}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className={classes.line}></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
    </ul>
  )
}
