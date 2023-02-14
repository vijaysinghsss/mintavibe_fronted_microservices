import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (

    
    <footer>
      <div className="container">

        <div className="row align-items-center">
          <div className="col-xl-6">
            <p className="footer-text"><b>Stay in touch</b></p>
            <ul className="social-media">
              <li>
                <a
                  href="https://www.facebook.com/crosstowernft"
                  target="_blank"
                >
                  <img src="/images/fb-icon.svg" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/CrossTowerNFT" target="_blank">
                  <img src="/images/tw-icon.svg" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/crosstowernft/"
                  target="_blank"
                >
                  <img src="/images/insta-icon.svg" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/crosstower-nft"
                  target="_blank"
                >
                  <img src="/images/linkdin.svg" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCAY9YpBnYsTdXObJ13qdRug"
                  target="_blank"
                >
                  <img src="/images/ytb.svg" />
                </a>
              </li>
              <li>
                <a href="https://t.me/+Zmi8Lty-H39lNDU1" target="_blank">
                  <img src="/images/tel.svg" />
                </a>
              </li>
              <li>
                <a href="https://discord.com/channels/@me" target="_blank">
                  <img src="/images/dr.svg" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-xl-6">
            <ul className="footer-link">
              <li>
                <Link to={`/about`}>About Us</Link>
              </li>
              <li>
                <Link to={`/blogs`}>Blog</Link>
              </li>
              <li>
                <Link to={"/faq"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/contactus"}>Contact Us</Link>
              </li>
              {/* <li>
                <Link to={`/faq`}>FAQs</Link>
              </li> */}
              <li>
                <Link to={`/terms-service`}>Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-2">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p className="copyRight">
                Copyright © 2022 CrossTower - All Rights Reserved. |{" "}
                <Link to={"privacy-policy"}>Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
