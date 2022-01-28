import React from 'react';
import s from './../../App/App.module.css'
import {Link} from "react-router-dom";

export const Error404Page = () => {
    return (
        <div className={s.errorPage}>
            <h1>404: Page not found</h1>
            <Link to={'/'}>
                <p>Click here to go main page</p>
            </Link>
        </div>
    )
}