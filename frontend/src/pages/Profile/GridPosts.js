import classes from "./Profile.module.css"
export default function GridPosts() {
  return (
    <div className="createPostPosts" style={{ cursor: "auto", overflow: "hidden" }}>
      <div
        className="createPost_header"
        style={{ justifyContent: "space-between" }}
      >
        <div className={classes.left_header_grid}>Posts</div>
        <div className="flex">
          <div className="gray_btn btn">
            <i className="equalize_icon"></i>
          </div>
          <div className="gray_btn btn">
            <i className="manage_icon"></i>
            Manage Posts
          </div>
        </div>
      </div>
      <div className="create_splitter"></div>
      <div
        className={`createPost_body ${classes.grid2}`}
        style={{ padding: "0" }}
      >
        <div className={`${classes.active} ${classes.view_type}`}>
          <i className="list_icon filter_blue"></i>
          List view
        </div>
        <div className={`hover1 ${classes.view_type}`}>
          <i className="grid_icon"></i>
          Grid view
        </div>
      </div>
    </div>
  )
}
