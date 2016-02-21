import React from 'react';
import {Link} from 'react-router';

const SongRow = ({song: {Author, Title, id}}) => (
    <Link to={"/songs/" + id}><div>{Author} {'-'} {Title}</div></Link>
);

export default SongRow;
