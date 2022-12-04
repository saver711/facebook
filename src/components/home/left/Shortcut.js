import classes from "./LeftHome.module.css";
export const Shortcut = ({ link, img, name }) => {
    return (
      <a href={link} target="_blank" rel="noreferrer" className={`hover2 ${classes.shortcut_item}`}>
        <img src={img} alt="" />
        <span>{name}</span>
      </a>
    );
  }
  