
import React from 'react';
import {Image} from '@themesberg/react-bootstrap';

import ReactLogo from "../assets/img/technologies/hub2-logo.png";

export default (props) => {

    const {show} = props;

    return (
        <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
            <Image className="loader-element animate__animated animate__jackInTheBox rounded-circle" src={ReactLogo} height={150} width={150} />
        </div>
    );

};
