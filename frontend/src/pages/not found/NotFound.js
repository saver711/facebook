/////////// IMPORTS
///
import { Link } from 'react-router-dom'
import classes from './NotFound.module.css'
///
/////////// HELPER FUNCTIONS
///

///
/////////// HELPER VARIABLES
///

///
export const NotFound = () =>{
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
return <>
<div className={classes.not_container}>
    <div>
    <h2>404</h2>
    <p>The page you are looking for is not accessible right now. </p>
    <Link to='/' >Go to home page
    </Link>
    </div>
</div>
</>
}