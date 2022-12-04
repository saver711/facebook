import classes from "./Intro.module.css"
import { useRef } from "react"
import Detail from "./Detail"
import { useClickOutside } from "../../helpers/clickOutside"
export default function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) {
  const modal = useRef(null)
  useClickOutside(modal, () => setVisible(false))
  return (
    <div className="blur">
      <div className={`postBox ${classes.infosBox}`} ref={modal}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon invertToWhite"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className={`scrollbar ${classes.details_wrapper}`}>
          <div className={classes.details_col}>
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <div className={classes.details_header}>Other Name</div>
          <Detail
            value={details?.otherName}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            text="other Name"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={classes.details_header}>Work</div>
          <Detail
            value={details?.job}
            img="job"
            placeholder="Add job title"
            name="job"
            text="a job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            value={details?.workplace}
            img="job"
            placeholder="Add a workplace"
            name="workplace"
            text="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={classes.details_header}>Education</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add a high school"
            name="highSchool"
            text="a high school"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add a college"
            name="college"
            text="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={classes.details_header}>Current City</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Add a current city"
            name="currentCity"
            text="a current city"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={classes.details_header}>Hometown</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Add hometown"
            name="hometown"
            text="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
          <div className={classes.details_header}>Relationship</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            placeholder="Add instagram"
            name="relationship"
            text="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            rel
          />
          <div className={classes.details_header}>Instagram</div>
          <Detail
            value={details?.instagram}
            img="home"
            placeholder="Add instagram username"
            name="instagram"
            text="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
          />
        </div>
      </div>
    </div>
  )
}
