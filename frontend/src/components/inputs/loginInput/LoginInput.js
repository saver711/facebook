/////////// IMPORTS
///
import classes from "./LoginInput.module.css";
import { ErrorMessage, useField } from "formik";
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

export const LoginInput = ({ placeholder, ...props }) => {
  /////////// VARIABLES
  ///
  const [field, meta] = useField(props);
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
    <div className={classes.input_wrap}>
      <input
        className={`${meta.touched && meta.error && "input_error" }`}
        placeholder={placeholder}
        {...field}
        {...props}
      />

      <ErrorMessage className="error" component="p" name={field.name} />
    </div>
  );
};
