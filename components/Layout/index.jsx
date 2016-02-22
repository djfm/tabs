import React from 'react';
import {Link} from 'react-router';

export default function Layout ({children}) {
    return (<div className="container-fluid">
        <div><Link to="/"><i className="material-icons">{'home'}</i></Link></div>
        <div>{children}</div>
    </div>);
}
