import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../apiwrapper";
import { apiURl } from "../store/actions";

function SideArea() {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const fetchBlogDetails = async () => {
    try {
      await API({
        url: `${apiURl.blogs}/${id}`,
        method: "GET",
      }).then((data) => {
        console.log(data,"blog")
        setDetails(data?.blogData || {});
      });
    } catch (error) {
      console.log(error);
      toast(`Something Wrong.`, { type: "error" });
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  return (
    <div className="left-side-area">
      <img
        className="rounded"
        src={`${process.env.REACT_APP_BACKENDURL}/` + details.Image}
      />
      <p className="published-date">
        Published On: {moment(details.CreatedAt).format(`DD, MMM, YYYY`)}
      </p>
      <h2>{details.Title}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: details.Description,
        }}
      />
    </div>
  );
}

export default SideArea;
