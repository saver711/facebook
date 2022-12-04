import classes from './LeftHome.module.css'
export const LeftLink = ({ img, text, notification }) => {
  return (
    <div className={`hover2 ${classes.left_link}`}>
      <img src={`../../../left/${img}.png`} alt="" />
      {notification !== undefined ? (
        <div className={classes.col}>
          <div className={classes.col_1}>{text}</div>
          <div className={classes.col_2}>{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
