import { Public } from "../../svg"
import classes from "./Intro.module.css"
export default function Bio({
  infos,
  handleChange,
  max,
  setShowBio,
  setShow,
  updateDetails,
  placeholder,
  name,
  detail,
  rel,
}) {
  return (
    <div className={classes.add_bio_wrap}>
      {rel ? (
        <select
          className={`whiteColor ${classes.select_rel}`}
          name={name}
          value={infos?.relationship}
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          autoFocus
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          maxLength={detail ? 25 : 100}
          className="textarea_blue details_input"
          onChange={handleChange}
        ></textarea>
      )}
      {!detail && (
        <p className={classes.remaining}>{max} characters remaining</p>
      )}
      <div className={`flex ${classes.flexFORbio}`}>
        <div className={`flex ${classes.flexFORbio} ${classes.flex_left}`}>
          <Public color="#65676b" />
          Public
        </div>
        <div className={`flex ${classes.flexFORbio} ${classes.flex_right}`}>
          <button
            className="gray_btn btn hover2"
            onClick={() => (!detail ? setShowBio(false) : setShow(false))}
          >
            Cancel
          </button>
          <button
            className="blue_btn btn"
            onClick={() => {
              updateDetails()
              {
                setShow && setShow(false)
              }
              {
                setShowBio && setShowBio(false)
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
