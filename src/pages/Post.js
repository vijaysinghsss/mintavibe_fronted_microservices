import React from "react";
import { Link } from "react-router-dom";

function Post(props) {
  console.log(props);
  return (
    <Link to={`/blog/${props.id}`}>
      <div className="post">
        <div className="post-img">
          <img
            className="rounded"
            src={`${process.env.REACT_APP_BACKENDURL}/` + props.img}
            alt=""
            height={'115px'}
          />
        </div>
        <div className="post-text">
          <p>
            <b>{props.title.slice(0, 80) + '..'}</b>
          </p>
          <p>{props.body}</p>
        </div>
      </div>
    </Link>
  );
}

export default Post;
