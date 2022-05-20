import classes from "./Intro.module.css"
import { useState } from "react"
import Bio from "./Bio"

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  rel,
}) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <div className={classes.add_details_flex} onClick={() => setShow(true)}>
        {value ? (
          <div className={classes.info_profile}>
            <div>
              <img className="invertToWhite" src={`../../../icons/${img}.png`} alt="" />
              {value}
            </div>
            <div className={`hover1 ${classes.detail_edit_icon}`}>

            <i className="edit_icon invertToWhite"></i>
            </div>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            <span className={classes.underline}>Add {text}</span>
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </div>
  )
}
