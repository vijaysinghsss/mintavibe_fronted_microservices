import React from 'react'
import Post from "./Post";
function TrendingNft() {
  return (
    <div>
      <h3>Trending NFT News</h3>
      <Post
        img="images/blog-2.png"
        title="How NFTs Can Boost the Creator Economy"
        body="Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur"
      />
      <Post
        img="images/blog-dummy.png"
        title="How NFTs Can Boost the Creator Economy"
        body="Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur"
      />
    </div>
  );
}

export default TrendingNft