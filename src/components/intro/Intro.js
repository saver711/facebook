/////////// IMPORTS
///
import classes from "./Intro.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Bio from "./Bio"
import EditDetails from "./EditDetails"
// import EditDetails from "./EditDetails"
///
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const Intro = ({ comingDetails, visitor, setOtherName }) => {
  /////////// VARIABLES
  ///
  const [details, setDetails] = useState()
  const initial = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  }
  ///
  /////////// CUSTOM HOOKS
  ///
  const user = useSelector((state) => state.userReducer.userData)
  ///
  /////////// STATES
  ///

  
  const [visible, setVisible] = useState(false)
  const [infos, setInfos] = useState(initial)
  const [showBio, setShowBio] = useState(false)
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100)
  ///
  /////////// SIDE EFFECTS
  ///
  useEffect(() => {
    setDetails(comingDetails)
    setInfos(comingDetails)
  }, [comingDetails])
  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///


  const handleChange = (e) => {
    const { name, value } = e.target
    setInfos({ ...infos, [name]: value })
    setMax(100 - e.target.value.length)
  } 
  ///
  /////////// FUNCTIONS
  ///
  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      setShowBio(false)
      setDetails(data)
      setOtherName(data?.otherName)
    } catch (error) {
      console.log(error.response?.data.message)
    }
  }
  ///

  ///
  return (
    <div className="profile_card mrT0">
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
      <div className="profile_card_header">Intro</div>
      {details?.bio && !showBio && (
        <div className={classes.info_col}>
          <span className={classes.info_text}>{details?.bio}</span>
          {!visitor && (
            <button
              className="gray_btn btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
        </div>
      )}
      {!details?.bio && !showBio && !visitor && (
        <button
          className={`gray_btn btn hover1 ${classes.w100}`}
          onClick={() => setShowBio(true)}
        >
          Add Bio
        </button>
      )}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {details?.job && details?.workplace ? (
        <div className={classes.info_profile}>
          <div>
              <img src="../../../icons/job.png" alt="" />
            <div>
              works as {details?.job} at <b>{details?.workplace}</b>
            </div>
          </div>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className={classes.info_profile}>
          <div>
            <img src="../../../icons/job.png" alt="" />
            works as {details?.job}
          </div>
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className={classes.info_profile}>
            <div>
              <img src="../../../icons/job.png" alt="" />
              works at {details?.workplace}
            </div>
          </div>
        )
      )}
      {details?.relationship && (
        <div className={classes.info_profile}>
          <div>
            <img src="../../../icons/relationship.png" alt="" />
            {details?.relationship}
          </div>
        </div>
      )}
      {details?.college && (
        <div className={classes.info_profile}>
          <div>
            <img src="../../../icons/studies.png" alt="" />
            studied at {details?.college}
          </div>
        </div>
      )}
      {details?.highSchool && (
        <div className={classes.info_profile}>
          <div>
            <img src="../../../icons/studies.png" alt="" />
            studied at {details?.highSchool}
          </div>
        </div>
      )}
      {details?.currentCity && (
        <div className={classes.info_profile}>
          <div>
            <img src="../../../icons/home.png" alt="" />
            Lives in {details?.currentCity}
          </div>
        </div>
      )}
      {details?.hometown && (
        <div className={classes.info_profile}>
          <div>
            <img src="../../../icons/home.png" alt="" />
            From {details?.hometown}
          </div>
        </div>
      )}
      {details?.hometown && (
        <div className={classes.info_profile}>
          <div>
            <img src="../../../icons/instagram.png" alt="" />
            <a
              href={`https://www.instagram.com/${details?.instagram}`}
              target="_blank"
            >
              {details?.instagram}
            </a>
          </div>
        </div>
      )}
      {!visitor && (
        <button
          className={`gray_btn btn hover1 ${classes.w100}`}
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}

      {!visitor && (
        <button className={`gray_btn btn hover1 ${classes.w100}`}>
          Add Hobbies
        </button>
      )}
      {!visitor && (
        <button className={`gray_btn btn hover1 ${classes.w100}`}>
          Add Featured
        </button>
      )}
    </div>
  )
}
