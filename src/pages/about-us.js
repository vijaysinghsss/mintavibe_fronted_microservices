import React from "react";

const AboutUs = () => {
    return (
        <>
            <section className="innre-bannre">
                <div className="term-bg" style={{ background: "url('images/terms-bg.png') no-repeat center center", backgroundSize: "cover" }}>
                    <h1>About Us</h1>
                </div>
            </section>
            <section className="about-us-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h4>About Us</h4>
                            <p>
                                Founded in 2019, CrossTower, ranked fourth in the world by
                                Cryptocompare, is a crypto exchange with capital market
                                capabilities. {"CrossTower’s "}global reach provides best-in-class
                                services and products tailored to the needs of retail traders
                                and institutions, including hedge funds, family offices,
                                endowments, pensions, and other market participants. CrossTower
                                leverages its vast experience in trading, technology,
                                operational infrastructure, innovative pricing, regulations, and
                                compliance to make cryptocurrency and digital assets accessible
                                to retail and sophisticated institutional market participants.
                                {"CrossTower’s "}NFT Marketplace is the sole NFT marketplace with a
                                financial ecosystem focused on community, collaborative
                                projects, and artist-driven initiatives. CrossTower has offices
                                located in the US, Bermuda, and India.
                            </p>
                        </div>
                        <div className="col-sm-6 price-sub-space">
                            <img src="/images/about-us-1.png" alt="" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 price-sub-space about-web-img">
                            <img src="/images/abou-img-2.png" alt="" />
                        </div>
                        <div className="col-sm-6">
                            <h4>Why Choose Us</h4>
                            <p>
                                CrossTower NFT is a dedicated marketplace designed to give
                                high-end buyers and sellers a platform to create, buy and sell
                                exclusive NFTs. Unlike other NFT platforms, CrossTower is a
                                premium and unique spot to pick the best collectibles from all
                                over the world. What differentiates us from alternate NFT
                                Marketplaces is our usability, authenticity, and the rarity and
                                value of our NFT Collections that we offer. We have launched our
                                Marketplace with the goal of bringing NFTs to the next level.
                            </p>
                        </div>
                        <div className="col-sm-6 price-sub-space about-mob-img">
                            <img src="/images/abou-img-2.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="leader-section">
                <div className="container">
                    <div className="row">
                        <h2>Our Leadership Team</h2>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 price-sub-space about-web-img text-center">
                            <img src="/images/kapil.png" alt="" />
                        </div>
                        <div className="col-sm-6">
                            <h4>Kapil Rathi</h4>
                            <span>Ceo & Co-Founder</span>
                            <p>
                                As the co-founder, Kapil Rathi has almost 30 years of experience
                                in the financial services industry. Before CrossTower, he was
                                the COO at Alphapoint and held senior leadership roles at NYSE,
                                Bats, ISE, and Cboe. Over the years, he has managed four equity
                                options exchanges at Cboe, launched a new options exchange at
                                Bats and built a variety of trading products at ISE. He has an
                                MBA from Fordham University.
                            </p>
                        </div>
                        <div className="col-sm-6 price-sub-space about-mob-img">
                            <img src="/images/kapil.png" alt="" />
                        </div>
                    </div>

                    <div className="row" style={{ padding: "50px 0px " }}>
                        <div className="col-sm-6">
                            <h4>Kristine Boggiano</h4>
                            <span>President & Co-Founder</span>
                            <p>
                                Kristin carries over 20 years of experience in Capital Markets
                                and is an expert in Digital Assets. Before starting CrossTower,
                                she was the Chief Legal Officer at Alphapoint. At Guggenheim
                                Partners and Schulte Roth and Zabel, she supported her clients
                                focusing on the legislative and regulative strategies on all
                                matters related to the traditional finance as well as fintech.
                                During this role, she founded the Structured Products and
                                Derivatives division, Digital Asset Legal Alliance (DARLA) and
                                Women in Derivatives (WIND). She has a law degree and MBA at
                                Northeastern University and a BA from Sarah Lawrence College.
                            </p>
                        </div>
                        <div className="col-sm-6 price-sub-space text-center">
                            <img src="/images/Kristine.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
