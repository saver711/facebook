import axios from "axios"
import { useCallback, useRef, useState } from "react"
import Cropper from "react-easy-crop"
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../../helpers/postFunction"
import { uploadImages } from "../../../helpers/uploadImages"
import { updateProfilePictureFun } from "../../../helpers/userFunctions"
import getCroppedImg from "../../../helpers/getCroppedImg"
import PulseLoader from "react-spinners/PulseLoader"
import Cookies from "js-cookie"
import classes from "./ProfilePicture.module.css"
import { Public } from "../../../svg"
import { userActions } from "../../../reducers/slices/userSlice"
export default function UpdateProfilePicture({
  setImage,
  image,
  setError,
  setShow,
  pRef,
}) {
  const dispatch = useDispatch()
  const [description, setDescription] = useState("")
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const slider = useRef(null)
  const user = useSelector((state) => state.userReducer.userData)
  const [loading, setLoading] = useState(false)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const zoomIn = () => {
    slider.current.stepUp()
    setZoom(slider.current.value)
  }
  const zoomOut = () => {
    slider.current.stepDown()
    setZoom(slider.current.value)
  }

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels)

        if (show) {
          setZoom(1)
          setCrop({ x: 0, y: 0 })
          setImage(img)
        } else {
          return img
        }
      } catch (error) {
        console.log(error)
      }
    },
    [croppedAreaPixels]
  )
  const updateProfilePicture = async () => {
    try {
      setLoading(true)
      let img = await getCroppedImage()
      let blob = await fetch(img).then((b) => b.blob())
      const path = `${user?.username}/profile_pictures`
      let formData = new FormData()
      formData.append("file", blob)
      formData.append("path", path)
      const res = await uploadImages(formData, path, user?.token)
      const updated_picture = await updateProfilePictureFun(
        res[0].url,
        user?.token
      )
      if (updated_picture === "ok") {
        const new_post = await createPost(
          "profilePicture",
          null,
          description,
          res,
          user?.id,
          user?.token
        )

        if (new_post.status === "ok") {
          setLoading(false)
          setImage("")
          pRef.current.style.backgroundImage = `url(${res[0].url})`
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: res[0].url,
            })
          )
          dispatch(userActions.updateStatePicture(res[0].url))
          setShow(false)
        } else {
          setLoading(false)

          setError(new_post)
        }
      } else {
        setLoading(false)

        setError(updated_picture)
      }
    } catch (error) {
      setLoading(false)
      setError(error.response?.data.message)
    }
  }

  return (
    <div className={`postBox scrollbar ${classes.update_img}`}>
      <div className={`box_header ${classes.box_headerFORupdate}`}>
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon invertToWhite"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className={classes.update_image_desc}>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>

      <div className={classes.update_center}>
        <div className={classes.cropper}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={false}
          />
        </div>
      </div>
      <div className={classes.slider}>
        <div className={`hover1 ${classes.slider_circle}`} onClick={zoomOut}>
          <i className="minus_icon invertToWhite"></i>
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={0.2}
          ref={slider}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
        />
        <div className={`hover1 ${classes.slider_circle}`} onClick={zoomIn}>
          <i className="plus_icon invertToWhite"></i>
        </div>
      </div>
      <div className={classes.flex_up}>
        <div className="gray_btn btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn btn">
          <i className="temp_icon"></i>Make temporary
        </div>
      </div>
      <div className={classes.flex_p_t}>
        <Public color="#65676b" />
        Your profile picture is public
      </div>
      <div className={classes.update_submit_wrap}>
        <button
          disabled={loading}
          className="blue_link hover3"
          style={{
            padding: "8.5px 12px",
            cursor: "pointer",
            borderRadius: "7px",
            fontWeight: "600",
            fontSize: "15px",
          }}
          onClick={() => setImage("")}
        >
          Cancel
        </button>
        <button
          className="blue_btn btn"
          disabled={loading}
          onClick={() => updateProfilePicture()}
        >
          {loading ? <PulseLoader color="#333" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  )
}
