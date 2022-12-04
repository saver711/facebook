/////////// IMPORTS
///
import RingLoader from "react-spinners/RingLoader"
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const ActivateForm = ({ type, header, text, loading }) => {
  /////////// VARIABLES
  ///

  ///
  /////////// STATES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///

  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///

  ///
  /////////// FUNCTIONS
  ///

  ///
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${type === "success" ? "success" : "error"}`}
        >
          {header}
        </div>
        <div className="popup_body">
          <div
            className="popup_message"
            style={{ color: "var(--color-primary)" }}
          >
            {text}
          </div>
          <div className="popup_message">Redirecting...</div>
          <RingLoader color="#1876f2" loading={loading} size={30} />
        </div>
      </div>
    </div>
  )
}
