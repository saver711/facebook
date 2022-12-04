import classes from "./Post.module.css"

export default function MenuItem({ icon, title, subtitle, img }) {
  return (
    <li className="hover1">
      {img ? (
        <img className="invertToWhite" src={img} alt="" />
      ) : (
        <i className={`invertToWhite ${icon}`}></i>
      )}
      <div className={classes.post_menu_text}>
        <span>{title}</span>
        {subtitle && <span className={classes.menu_post_col}>{subtitle}</span>}
      </div>
    </li>
  )
}
