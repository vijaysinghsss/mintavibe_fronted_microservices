import React from "react";
import { useParams } from "react-router-dom";
import BlogImage from "./BlogImage";
import Container from "./Container";

function BlogDetails() {
  return (
    <div>
      <BlogImage />
      <Container />
    </div>
  );
}

export default BlogDetails;
