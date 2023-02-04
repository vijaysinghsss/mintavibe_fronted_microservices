import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../apiwrapper";
import { apiURl } from "../store/actions";
import Blog from "./Blog";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      await API({
        url: `${apiURl.blogs}`,
        method: "GET",
      }).then((data) => {
        console.log(data,"blog")
        setBlogs([...(data?.data?.allBlogs || [])]);
      });
    } catch (error) {
      console.log(error);
      toast(`Something Wrong.`, { type: "error" });
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container px-5">
      <div className="row">
        {blogs.map((item) => (
          <Blog {...item} />
        ))}
      </div>
    </div>
  );
}
export default AllBlogs;
