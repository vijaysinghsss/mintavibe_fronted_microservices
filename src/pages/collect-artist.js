import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,

} from "@fortawesome/free-solid-svg-icons";
import Collectartists from '../components/Collect-Page-artists/collectartists';


export default function Artist() {
    return (
        <>
            <section className="search-section-new">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <select id="" name="Categories">
                                <option value="frontend_developer">All NFTs</option>
                                <option value="NFTs 1">NFTs 1</option>
                                <option value="NFTs 2">NFTs 2</option>
                                <option value="NFTs 3">NFTs 3</option>
                                <option value="NFTs 4">NFTs 4</option>
                            </select>
                        </div>
                        <div className="col-md-9">

                            <div className="input-group mb-3">
                                <input type="text" className="form-control input-text" placeholder="Search products...." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-lg" type="button"><FontAwesomeIcon icon={faSearch} /></button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <Collectartists />

        </>
    )
}
