import React, { useEffect, useState } from 'react'
import Post from "./Post";
function TrendingNft() {
  const [articles, setArticles] = useState([]);

  const fetchRecentArticles = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/trending`).then(
      (data) => {
        return data.json();
      }
    );

    // console.log("res>>", res);
    setArticles(res?.data || []);
  };

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  return (
    <div>
      <h3>Trending NFT News</h3>
      {articles.map((item, key) => {
        if (key > 2) {
          return null;
        }

        return (
          <Post
            img={item.Image}
            title={item.Title}
            body={item.BlogDescription}
            id={item._id}
          />
        );
      })}
    </div>
  );
}

export default TrendingNft