/////////// IMPORTS
///
import { ErrorMessage, Field, Form, Formik } from "formik"
import { RegisterInput } from "../../components/inputs/registerInput/RegisterInput"
import { useRef, useState } from "react"

import classes from "./RegisterForm.module.css"
import * as Yup from "yup"
import RingLoader from "react-spinners/RingLoader"
import axios from "axios"
import { useDispatch } from "react-redux"
import { userActions } from "../../reducers/slices/userSlice"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { ConnectedFocusError } from "focus-formik-error"
import { useClickOutside } from "../../helpers/clickOutside"

///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const RegisterForm = ({ title }) => {
  /////////// VARIABLES
  ///
  const registerForm = useRef()
  const currYear = new Date().getFullYear()
  const years = Array.from(new Array(108), (val, index) => currYear - index)
  const months = Array.from(new Array(12), (val, index) => 1 + index)
  let allDays
  let dateIsValid = true
  let dateErrorOutput = ""

  ////
  const current_date = new Date()
  const atleast18 = new Date(1970 + 18, 0, 1)
  const olderThan70 = new Date(1970 + 70, 0, 1)

  const registration = localStorage.getItem("registerData")
    ? JSON.parse(localStorage.getItem("registerData"))
    : null

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What is your first name")
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed"),
    last_name: Yup.string()
      .required("What is your last name")
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed"),
    email: Yup.string()
      .required("What is your email address")
      .email("Email is not valid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    gender: Yup.string().required("Gender is required"),
    // bYear: Yup.number().required('').max(Yup.ref('bMonth'))
  })

  ///
  /////////// STATES
  ///

  const [error, errorUpdater] = useState("")
  const [success, successUpdater] = useState("")
  const [loading, loadingUpdater] = useState(false)

  ///
  /////////// CUSTOM HOOKS
  ///
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useClickOutside(registerForm, () => navigate(-1))
  ///
  /////////// SIDE EFFECTS
  ///

  ///
  /////////// IF CASES
  ///

  ///
  /////////// EVENTS
  ///
  const registerSubmit = async (values) => {
    try {
      loadingUpdater(true)
      successUpdater("")
      errorUpdater("")

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          bYear: values.bYear,
          bMonth: values.bMonth,
          bDay: values.bDay,
          gender: values.gender,
        }
      )
      loadingUpdater(false)
      successUpdater(data.message)
      const { message, ...rest } = data
      
      setTimeout(() => {
        localStorage.setItem("registerData", null)
        dispatch(userActions.userLoginHandler(rest))
        Cookies.set("user", JSON.stringify(rest))
        navigate("/")
      }, 2000)
      
    } catch (error) {
      loadingUpdater(false)
      successUpdater("")
      errorUpdater(error.response.data.message)
    }
  }
  ///
  /////////// FUNCTIONS
  ///
  const getDays = (year, month) => {
    ////>>> getDay() >> method returns the day of the week for the specified date according to local time, where 0 represents Sunday
    ///>>> getDate() >> returns the day of the month for the specified date according to local time.
    /*
     0 > last day of the month
     1 > 1st
     2 > 2nd .....
     */
    const days = new Date(year, month, 0).getDate()
    allDays = Array.from(new Array(days), (val, index) => 1 + index)
  }

  ////>>> getting number of days in a month

  ///
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {/* MOTION */}
      <div className="blurWithCenteredContent">
        <div className={`controlHeight ${classes.register}`} ref={registerForm}>
          <div className={classes.register_header}>
            <Link to=".." className="exit_icon invertToWhite"></Link>
            <span>Sign Up</span>
            <span>it's quick and easy</span>
          </div>
          <Formik
            initialValues={{
              first_name: registration?.first_name
                ? registration?.first_name
                : "",
              last_name: registration?.last_name ? registration?.last_name : "",
              email: registration?.email ? registration?.email : "",
              password: "",
              gender: registration?.gender ? registration?.gender : "",
              bDay: registration?.bDay
                ? registration?.bDay
                : new Date().getDate(),
              bMonth: registration?.bMonth
                ? registration?.bMonth
                : new Date().getMonth() + 1,
              bYear: registration?.bYear
                ? registration?.bYear
                : new Date().getFullYear() - 18,
            }}
            validationSchema={registerValidation}
            onSubmit={(values) => dateIsValid && registerSubmit(values)}
          >
            {(formik) => {
              const { password, ...myData } = formik.values
              localStorage.setItem("registerData", JSON.stringify(myData))
              getDays(formik.values.bYear, formik.values.bMonth)

              const picked_date = new Date(
                formik.values.bYear,
                formik.values.bMonth - 1,
                formik.values.bDay
              )

              if (current_date - picked_date < atleast18) {
                dateIsValid = false
                dateErrorOutput = (
                  <p className="error">You must be at least 18 years old</p>
                )
              } else if (current_date - picked_date > olderThan70) {
                dateIsValid = false
                dateErrorOutput = (
                  <p className="error">You must be younger than 70 years old</p>
                )
              } else {
                dateIsValid = true
                dateErrorOutput = ""
              }

              return (
                <Form className={classes.register_form}>
                  <ConnectedFocusError />
                  <div className={classes.reg_line}>
                    <RegisterInput
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                    />
                    <RegisterInput
                      type="text"
                      placeholder="Surname"
                      name="last_name"
                    />
                  </div>
                  <div className={classes.reg_line}>
                    <RegisterInput
                      type="email"
                      placeholder="Your E-mail address"
                      name="email"
                    />
                  </div>
                  <div className={classes.reg_line}>
                    <RegisterInput
                      type="password"
                      placeholder="New password"
                      name="password"
                    />
                  </div>
                  <div className={classes.reg_col}>
                    <div className={classes.reg_line_header}>
                      Date of birth <i className="info_icon"></i>
                    </div>

                    <div className={classes.reg_grid}>
                      <Field name="bDay" as="select">
                        {allDays.map((day, i) => (
                          <option key={i} defaultValue={day}>
                            {day}
                          </option>
                        ))}
                      </Field>
                      <Field name="bMonth" as="select">
                        {months.map((month, i) => (
                          <option key={i} defaultValue={month}>
                            {month}
                          </option>
                        ))}
                      </Field>
                      <Field name="bYear" as="select">
                        {years.map((year, i) => (
                          <option key={i} defaultValue={year}>
                            {year}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {dateErrorOutput}
                  </div>
                  <div className={classes.reg_col}>
                    <div className={classes.reg_line_header}>
                      Gender <i className="info_icon"></i>
                    </div>

                    <div
                      className={`${classes.reg_grid} ${classes.reg_grid_2}`}
                    >
                      <label htmlFor="male">
                        Male
                        <Field
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                        />
                      </label>
                      <label htmlFor="female">
                        Female
                        <Field
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                        />
                      </label>
                    </div>
                    <ErrorMessage
                      name="gender"
                      className="error"
                      component="p"
                    />
                  </div>
                  <p className={classes.reg_info}>
                    By clicking Sign Up, you agree to our{" "}
                    <Link to="/" target="_blank">
                      Terms
                    </Link>
                    ,{" "}
                    <Link to="/" target="_blank">
                      Data Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/" target="_blank">
                      Cookie Policy
                    </Link>
                    . You may receive SMS notifications from us and can opt out
                    at any time.
                  </p>
                  <div className={classes.reg_btn_wrapper}>
                    {/* MOTION */}
                    <button type="submit" className="blue_btn btn open_signup">
                      Sign Up
                    </button>
                  </div>
                  <RingLoader color="#1876f2" loading={loading} size={30} />
                  {error && <p className="error">{error}</p>}
                  {success && <p className="success">{success}</p>}
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </>
  )
}
