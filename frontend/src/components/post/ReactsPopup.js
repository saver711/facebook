import classes from "./Post.module.css"
const reactsArray = [
  {
    name: "like",
    image: "../../../reacts/like.gif",
  },
  {
    name: "love",
    image: "../../../reacts/love.gif",
  },
  {
    name: "haha",
    image: "../../../reacts/haha.gif",
  },
  {
    name: "wow",
    image: "../../../reacts/wow.gif",
  },
  {
    name: "sad",
    image: "../../../reacts/sad.gif",
  },
  {
    name: "angry",
    image: "../../../reacts/angry.gif",
  },
]
export default function ReactsPopup() {
  return (
    <>
      {reactsArray.map((react, i) => (
        <div className={classes.react} key={i}>
          <img src={react.image} alt="" />
        </div>
      ))}
    </>
  )
}
