import { Dots } from "../../svg"
import { stories } from "../../data/home"
import AddFriendSmallCard from "./AddFriendSmallCard"
import classes from "./Profile.module.css"
export default function PplYouMayKnow() {
  return (
    <div className={classes.peopleYouMayKnow}>
      <div className={classes.peopleYouMayKnow_header}>
        People You May Know
        <div className="post_header_right ppl_circle hover2">
          <Dots />
        </div>
      </div>
      <div className={classes.peopleYouMayKnow_list}>
        {stories.map((item, i) => (
          <AddFriendSmallCard item={item} key={i} />
        ))}
      </div>
    </div>
  )
}
