import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import BlogDetails from "./BlogDetails";

function Blog(item) {
  return (
    <div className="col-12 col-sm-10 col-md-6 col-lg-4">
      <div className="blog-box">
        <div className="blog-box-img-box">
          <img
            src={process.env.REACT_APP_BACKENDURL + "/" + item.Image}
            alt=""
          />
        </div>
        <div className="blog-box-cont">
          <h3 title={item.Title}>{item.Title.slice(0, 25) + '...'}</h3>
          <p
          >{item.BlogDescription || ''}</p>
          <div className="brline"></div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <p className="date" style={{ maxHeight: 'unset', minHeight: 'unset' }}>
                  {moment(item.CreatedAt).format("D, MMM, YYYY")}
                </p>
              </div>
              <div className="col-sm-6">
                <div className="blog-button">
                  <a
                    style={{ cursor: "pointer" }}
                    href="!#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Link to={`/blog/${item._id}`}>Read more</Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Blog;
