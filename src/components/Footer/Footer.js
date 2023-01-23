import { Link } from "react-router-dom";

function Footer() {
    return (
        <div>
            <footer>
                <div className="container">
                    <div className="row">
                        <p><b>Stay in touch</b></p>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <ul className="social-media">
                                <li><a href="https://www.facebook.com/crosstowernft" target="_blank"><img src="/images/fb-icon.svg" /></a></li>
                                <li><a href="https://twitter.com/CrossTowerNFT" target="_blank"><img src="/images/tw-icon.svg" /></a></li>
                                <li><a href="https://www.instagram.com/crosstowernft/" target="_blank"><img src="/images/insta-icon.svg" /></a></li>
                                <li><a href="https://www.linkedin.com/company/crosstower-nft" target="_blank"><img src="/images/linkdin.svg" /></a></li>
                                <li><a href="https://www.youtube.com/channel/UCAY9YpBnYsTdXObJ13qdRug" target="_blank"><img src="/images/ytb.svg" /></a></li>
                                <li><a href="https://t.me/+Zmi8Lty-H39lNDU1" target="_blank"><img src="/images/tel.svg" /></a></li>
                                <li><a href="https://discord.com/channels/@me" target="_blank"><img src="/images/dr.svg" /></a></li>
                            </ul>

                        </div>
                        <div className="col-sm-6">
                            <ul className="footer-link">
                                <li><a href="!#">About NFTs</a></li>
                                <li><a href="about-us.html">About Us</a></li>
                                <li><a href="blog.html">Blog</a></li>
                                <li><a href="!#">Contact Us</a></li>
                                <li><a href="terms-of-service.html">Terms of Service</a></li>

                            </ul>

                        </div>
                    </div>
                </div>

                <div className="footer-2">
                    <div className="container">
                        <div className="row">

                            <div className="col-sm-12"><p>Copyright © 2022 Cros ower - All Rights Reserved.    | <Link to={`/privacy-policy`} >Privacy Policy</Link></p></div>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    )
}
export default Footer;