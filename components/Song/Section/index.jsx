import React from 'react';
import './song-section.scss';

const Section = ({section: {name, title, body}}) => (<div className="song-section">
    <span className="name">{name}</span>
    <span className="title">{title}</span>
    <div className="body">
        {body}
    </div>
</div>);

export default Section;
