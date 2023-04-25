import React from "react";
import PrivacyModal from "./privacyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container bg-white" >
                <div className="item1 bg-white">
                    <PrivacyModal />
                </div>

                <div className="item2 bg-white size">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <FontAwesomeIcon icon={faCopyright} />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} <Link to={"/"}>Tech Blog</Link> . All Rights
                        Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;